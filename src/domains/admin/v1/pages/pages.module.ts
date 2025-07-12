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
import { ContactUs } from './entities/contact.entity';
import { ContactUsController } from './controllers/contact-us.controller';
import { ContactUsService } from './services/contact-us.service';
import { ParticipantController } from './controllers/participant.controller';
import { ParticipantService } from './services/participant.service';
import { Documentary } from './entities/documentary.entity';
import { DocumentaryController } from './controllers/documentary.controller';
import { DocumentaryService } from './services/documentary.service';
import { Achievement } from './entities/achievement.entity';
import { AchievementController } from './controllers/achievement.controller';
import { AchievementService } from './services/achievement.service';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityController } from './controllers/opportunity.controller';
import { OpportunityService } from './services/opportunity.service';
import { SignatureFile } from './entities/signature-file.entity';
import { SignatureFileController } from './controllers/signature-file.controller';
import { SignatureFileService } from './services/signature-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Director, Faq, DocumentResource, Participant, AnnualReport, Survey, Legislation, ContactUs, Documentary, Achievement, Opportunity, SignatureFile])],
  controllers: [PagesController, AnnualReportController, SurveyController, LegislationController, ContactUsController, ParticipantController, DocumentaryController, AchievementController, OpportunityController, SignatureFileController],
  providers: [PagesService, AnnualReportService, SurveyService, LegislationService, ContactUsService, ParticipantService, DocumentaryService, AchievementService, OpportunityService, SignatureFileService],
  exports: [PagesService],
})
export class PagesModule {}
