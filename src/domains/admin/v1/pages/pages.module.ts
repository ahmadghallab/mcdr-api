import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Director } from './entities/director.entity';
import { Faq } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Director, Faq])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService],
})
export class PagesModule {}
