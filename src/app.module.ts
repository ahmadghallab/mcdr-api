import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminV1Module } from './domains/admin/v1/admin-v1.module';
import { UserV1Module } from './domains/user/v1/user-v1.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';

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
        host: configService.get('db.host'),
        port: +configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.name'),
        autoLoadEntities: true,
        synchronize: true
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ...modules,
  ],
  providers: [],
})
export class AppModule {}
