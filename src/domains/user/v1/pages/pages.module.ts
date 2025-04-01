import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Faq } from 'src/domains/admin/v1/pages/entities/faq.entity';
import { Director } from 'src/domains/admin/v1/pages/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Faq, Director])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService, ],
})
export class PagesModule {}
