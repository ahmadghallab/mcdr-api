import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Faq } from 'src/domains/admin/v1/faqs/entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Faq])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService, ],
})
export class PagesModule {}
