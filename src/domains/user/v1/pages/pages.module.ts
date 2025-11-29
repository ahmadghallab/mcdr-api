import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Faq } from 'src/domains/admin/v1/pages/entities/faq.entity';
import { Director } from 'src/domains/admin/v1/pages/entities/director.entity';
import { Participant } from 'src/domains/admin/v1/pages/entities/participant.entity';
import { AnnualReport } from 'src/domains/admin/v1/pages/entities/annual-report.entity';
import { Legislation } from 'src/domains/admin/v1/pages/entities/legislation.entity';
import { ContactUs } from 'src/domains/admin/v1/pages/entities/contact.entity';
import { Documentary } from 'src/domains/admin/v1/pages/entities/documentary.entity';
import { Achievement } from 'src/domains/admin/v1/pages/entities/achievement.entity';
import { Opportunity } from 'src/domains/admin/v1/pages/entities/opportunity.entity';
import { SignatureFile } from 'src/domains/admin/v1/pages/entities/signature-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Faq, Director, Participant, AnnualReport, Legislation, ContactUs, Documentary, Achievement, Opportunity, SignatureFile])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [PagesService, ],
})
export class PagesModule {}
