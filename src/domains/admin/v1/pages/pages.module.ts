import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Director } from './entities/director.entity';
import { Faq } from './entities/faq.entity';
import { DocumentResource } from './entities/document-resource.entity';
import { Participant } from './entities/participant.entity';
import { AnnualReport } from './entities/annual-report.entity';
import { PagesService } from './services/pages.service';
import { PagesController } from './controllers/pages.controller';
import { AnnualReportController } from './controllers/annual-report.controller';
import { AnnualReportService } from './services/annual-report.service';
import { Survey } from './entities/survey.entity';
import { SurveyController } from './controllers/survey.controller';
import { SurveyService } from './services/survey.service';
import { Legislation } from './entities/legislation.entity';
import { LegislationController } from './controllers/legislation.controller';
import { LegislationService } from './services/legislation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Director, Faq, DocumentResource, Participant, AnnualReport, Survey, Legislation])],
  controllers: [PagesController, AnnualReportController, SurveyController, LegislationController],
  providers: [PagesService, AnnualReportService, SurveyService, LegislationService],
  exports: [PagesService],
})
export class PagesModule {}
