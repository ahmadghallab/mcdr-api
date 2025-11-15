import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminV1Module } from './domains/admin/v1/admin-v1.module';
import { UserV1Module } from './domains/user/v1/user-v1.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SearchSubscriber } from './core/search/search.subscriber';
import { DataSource } from 'typeorm';
import { SearchService } from './core/search/search.service';

export const modules = [
  CoreModule,
  AdminV1Module,
  UserV1Module
];

@Module({
  imports: [
    RouterModule.register(routes), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 0,
        limit: 0,
      }
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ...modules,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    SearchService
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource, private readonly searchService: SearchService) {
    this.dataSource.subscribers.push(new SearchSubscriber(this.searchService));
  }
}
