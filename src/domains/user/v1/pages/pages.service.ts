import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Faq } from 'src/domains/admin/v1/pages/entities/faq.entity';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Director } from 'src/domains/admin/v1/pages/entities/director.entity';

import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { localizeContent, localizedValue } from 'src/core/common/utils/localize.util';
import { NamedLink, ContactUs, RelatedSite, ElectronicSignatureFile, UserDirector, Award, DocumentaryVideo, LawPage } from './page.types';
import { isPublished } from 'src/core/filters/published.filter';
import { DocumentResource } from 'src/domains/admin/v1/pages/entities/document-resource.entity';
import { DocumentResourceType } from 'src/domains/admin/v1/pages/enums/document-resource-type.enum';
import { ParticipantType } from 'src/domains/admin/v1/pages/enums/participant-type.enum';
import { Participant } from 'src/domains/admin/v1/pages/entities/participant.entity';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';

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
    const faqs = await this.faqsRepository.findBy({ department, ...isPublished() });

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
    const contactInfo = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.CONTACT_US 
    });

    const responseData = {
      ...contactInfo.data,
      headOffice: {
        ...contactInfo.data.headOffice,
        address: contactInfo.data.headOffice.address[lang],
      },
      heliopolisBranch: {
        ...contactInfo.data.heliopolisBranch,
        address: contactInfo.data.heliopolisBranch.address[lang],
      },
      alexBranch: {
        ...contactInfo.data.alexBranch,
        address: contactInfo.data.alexBranch.address[lang],
      },
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
    const annualReports = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.ANNUAL_REPORTS 
    });

    const responseData = annualReports.data.map((item) => ({
      url: item.url[lang],
      name: item.name[lang],
    }));
    return responseData;
  }

  async findSurveys(lang: string): Promise<NamedLink[]> {
    const surveys = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.SURVEYS 
    });

    const responseData = surveys.data.map((item) => ({
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

  async findLawsPage(lang: string, pageName: LawPage): Promise<NamedLink[]> {
    let type: DocumentResourceType;
    
    switch(pageName) {
      case LawPage.ImportantLinks:
        type = DocumentResourceType.IMPORTANT_LINKS;
        break;
      case LawPage.OtherLawsRegulatingWork:
        type = DocumentResourceType.OTHER_LAWS_REGULATING_WORK;
        break;
      case LawPage.Laws:
        type = DocumentResourceType.RULES
        break;
      case LawPage.RulesSettlementGuaranteeFund:
        type = DocumentResourceType.SETTLEMENT_GUARANTEE_FUND_RULES
        break;
    }

    const lawPage = await this.documentResourcesRepository.findOneByOrFail({ type });

    const responseData = lawPage.data.map((item) => ({
      name: item.name[lang],
      url: item.url,
    }));

    return responseData;
  }

  async findMembersForms(lang: string): Promise<NamedLink[]> {
    const membersForms = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.MEMBERS_SUBSCRIBERS_FORMS 
    });

    const responseData = membersForms.data.map((item) => ({
      url: item.url,
      name: item.name[lang],
    }));
    return responseData;
  }

  async findAwards(lang: string): Promise<Award[]> {
    const awards = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.ACHIEVEMENTS_AWARDS 
    });

    const responseData = awards.data.map((award) => ({
      ...award,
      description: localizedValue(award.description, lang),
    }));

    return responseData;
  }

  async findDocumentaries(lang: string): Promise<DocumentaryVideo[]> {
    const documentaries = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.DOCUMENTARIES 
    });

    const responseData = documentaries.data.map((doc) => ({
      ...doc,
      name: localizedValue(doc.name, lang),
    }));

    return responseData;
  }

  async findDocumentary(lang: string, id: number): Promise<DocumentaryVideo> {
    const documentaries = await this.documentResourcesRepository.findOneByOrFail({ 
      type: DocumentResourceType.DOCUMENTARIES 
    });

    const documentary = documentaries.data.find(doc => doc.id === id)

    const responseData = {
      ...documentary,
      name: localizedValue(documentary.name, lang),
    };

    return responseData;
  }
}
