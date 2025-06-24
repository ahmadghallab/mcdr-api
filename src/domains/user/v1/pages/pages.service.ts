import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Faq } from 'src/domains/admin/v1/pages/entities/faq.entity';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Director } from 'src/domains/admin/v1/pages/entities/director.entity';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { localizeContent, localizedValue } from 'src/core/common/utils/localize.util';
import { NamedLink, RelatedSite, ElectronicSignatureFile, UserDirector, LocalizedDocumentary, LocalizedAchievement } from './page.types';
import { isPublished } from 'src/core/filters/published.filter';
import { DocumentResource } from 'src/domains/admin/v1/pages/entities/document-resource.entity';
import { DocumentResourceType } from 'src/domains/admin/v1/pages/enums/document-resource-type.enum';
import { ParticipantType } from 'src/domains/admin/v1/pages/enums/participant-type.enum';
import { Participant } from 'src/domains/admin/v1/pages/entities/participant.entity';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { AnnualReport } from 'src/domains/admin/v1/pages/entities/annual-report.entity';
import { Survey } from 'src/domains/admin/v1/pages/entities/survey.entity';
import { LegislationType } from 'src/domains/admin/v1/pages/enums/legislation-type.enum';
import { Legislation } from 'src/domains/admin/v1/pages/entities/legislation.entity';
import { ContactUs } from 'src/domains/admin/v1/pages/entities/contact.entity';
import { ORDER_BY_CREATED_DESC } from 'src/core/utils/order.util';
import { Documentary } from 'src/domains/admin/v1/pages/entities/documentary.entity';
import { Achievement } from 'src/domains/admin/v1/pages/entities/achievement.entity';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
    @InjectRepository(DocumentResource)
    private readonly documentResourcesRepository: Repository<DocumentResource>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(AnnualReport)
    private readonly annualReportRepository: Repository<AnnualReport>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Legislation)
    private readonly legislationRepository: Repository<Legislation>,
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
    @InjectRepository(Documentary)
    private readonly documentaryRepository: Repository<Documentary>,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async findPage(slug: string, lang: string): Promise<Partial<Page>> {
    try {
      const page = await this.pagesRepository.findOneByOrFail({ slug, ...isPublished() });
  
      const localizedPages = {
        id: page.id,
        slug: page.slug,
        section: page.section,
        ...localizeContent(page, lang, ["title", "body", "content"]),
      } 
      return localizedPages;
    } catch (err) {
      throw new NotFoundException('Page not found');
    }
  }

  async findFaqs(lang: string, department: FaqDepartment): Promise<Partial<Faq>[]> {
    const faqs = await this.faqsRepository.find({
      where: { department, ...isPublished() },
      order: { order: 'ASC' }
    });

    const localizedFaqs = faqs.map(faq => ({
      id: faq.id,
      order: faq.order,
      ...localizeContent(faq, lang, ["q", "a"]),
    }))

    return localizedFaqs;
  }

  async findParticipants(
    lang: string, 
    type: ParticipantType, 
    paginationDto: PaginationDto
  ): Promise<[Partial<Participant>[], number]> {
    const [ items, total ] = await this.participantRepository.findAndCount({ 
      where: {
        type, 
        ...isPublished(), 
      },
      skip: paginationDto.skip,
      take: paginationDto.take,
    });

    const localizedParticipants = items.map(participant => ({
      ...participant,
      name: lang === 'ar' ? participant.aname : participant.ename,
      address: lang === 'ar' ? participant.aaddress : participant.eaddress,
      board: participant.board?.map(b => ({
        ...b,
        name: lang === 'ar' ? b.aname : b.ename
      }))
    }));

    return [ localizedParticipants, total ];
  }

  async findParticipant(
    lang: string, 
    id: number,
  ): Promise<Partial<Participant>> {
    const participant = await this.participantRepository.findOneByOrFail({ id });

    const localizedParticipant = {
      ...participant,
      name: lang === 'ar' ? participant.aname : participant.ename,
      address: lang === 'ar' ? participant.aaddress : participant.eaddress,
    };

    return localizedParticipant;
  }

  async findDirectors(lang: string): Promise<UserDirector[]> {
    const directors = await this.directorsRepository.find({
      where: isPublished(),
    });

    const responseData = directors.map((director) => ({
      id: director.id,
      avatarUrl: director.avatarUrl,
      order: director.order,
      title: localizedValue(director.title, lang),
      name: localizedValue(director.name, lang),
      position: localizedValue(director.position, lang),
      bio: localizedValue(director.bio, lang),
    }));

    return responseData;
  }

  async findContactInfo(lang: string): Promise<ContactUs> {
    const contactInfo = await this.contactUsRepository.findOne({ where: {} });    

    const responseData = {
      ...contactInfo,
      branches: contactInfo.branches.map(b => ({
        ...b,
        name: b.name[lang],
        address: b.address[lang]
      })),
    };

    return responseData;
  }

  async findRelatedSites(lang: string): Promise<RelatedSite[]> {
    const relatedSite = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.RELATED_SITES 
    });

    const responseData = relatedSite.data.map((item) => ({
      ...item,
      name: item.name[lang],
    }));

    return responseData;
  }

  async findAnnualReports(lang: string): Promise<NamedLink[]> {
    const annualReports = await this.annualReportRepository.find({
      where: isPublished(),
      order: ORDER_BY_CREATED_DESC,
    });

    const responseData = annualReports.map((item) => ({
      url: item.url[lang],
      name: item.name[lang],
    }));
    
    return responseData; 
  }

  async findSurveys(lang: string): Promise<NamedLink[]> {
    const surveys = await this.surveyRepository.find({
      where: isPublished(),
    });

    const responseData = surveys.map((item) => ({
      url: item.url,
      name: item.name[lang],
    }));

    return responseData;
  }

  async findElectronicSignatureFiles(lang: string): Promise<ElectronicSignatureFile[]> {
    const electronicSignatureFiles = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.ELECTRONIC_SIGNATURE_FILES 
    });

    const responseData = Object.values(
      electronicSignatureFiles.data.reduce(
        (acc: Record<string | null, { name: string | null; items: NamedLink[] }>, item) => {
          const key = item.type ?? null;
          (acc[key] ??= { name: key, items: [] }).items.push(item);
          return acc;
        },
        {} as Record<string | null, { name: string | null; items: NamedLink[] }>
      )
    );

    return responseData as ElectronicSignatureFile[];
  }

  async findLegislations(lang: string, type: LegislationType): Promise<NamedLink[]> {
    const legislations = await this.legislationRepository.findBy({ 
      type,
      ...isPublished()
    });

    const responseData = legislations.map((item) => ({
      name: item.name[lang],
      url: item.url,
    }));

    return responseData;
  }

  async findAchievements(lang: string): Promise<LocalizedAchievement[]> {
    const achievements = await this.achievementRepository.find({
      where: isPublished(),
    });

    const responseData = achievements.map((award) => ({
      ...award,
      description: localizedValue(award.description, lang),
    }));

    return responseData;
  }

  async findDocumentaries(lang: string): Promise<LocalizedDocumentary[]> {
    const documentaries = await this.documentaryRepository.find({
      where: isPublished(),
    });

    const responseData = documentaries.map((doc) => ({
      ...doc,
      name: localizedValue(doc.name, lang),
    }));

    return responseData;
  }
}
