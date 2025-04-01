import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Faq } from 'src/domains/admin/v1/pages/entities/faq.entity';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Director } from 'src/domains/admin/v1/pages/entities/director.entity';

import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { localizeContent, localizedValue } from 'src/core/common/utils/localize.util';
import { NamedLink, ContactUs, RelatedSite, ElectronicSignatureFile, UserDirector, Award, DocumentaryVideo, LawPage } from './page.types';

import * as contactInfo from './data/customer-support/contact-us.json';
import * as relatedSite from './data/customer-support/related-sites.json';
import * as annualReports from './data/reports/annual-reports.json';
import * as surveys from './data/reports/surveys.json';
import * as electronicSignatureFiles from './data/electronic-signature/files.json';
import * as importantLinks from './data/laws-regulations/important-links.json';
import * as workLaws from './data/laws-regulations/other-laws-regulating-work.json';
import * as generalRules from './data/laws-regulations/rules.json';
import * as fundRules from './data/laws-regulations/settlement-guarantee-fund-rules.json';
import * as membersForms from './data/members-subscribers/forms.json';
import * as awards from './data/overview/achievements-awards.json';
import * as documentaries from './data/overview/documentaries.json';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
  ) {}

  async findOne(slug: string, lang: string): Promise<Page> {
    const page = await this.pagesRepository.findOneByOrFail({ slug });

    const localizedPages = {
      ...page,
      ...localizeContent(page, lang, ["title", "body", "content"]),
    } 

    return localizedPages;
  }

  async findFaqs(lang: string, department: FaqDepartment): Promise<Faq[]> {
    const faqs = await this.faqsRepository.findBy({ department });

    const localizedFaqs = faqs.map(faq => ({
      ...faq,
      ...localizeContent(faq, lang, ["q", "a"]),
    }))

    return localizedFaqs;
  }

  findContactInfo(lang: string): ContactUs {
    const responseData = {
      ...contactInfo,
      headOffice: {
        ...contactInfo.headOffice,
        address: contactInfo.headOffice.address[lang],
      },
      heliopolisBranch: {
        ...contactInfo.heliopolisBranch,
        address: contactInfo.heliopolisBranch.address[lang],
      },
      alexBranch: {
        ...contactInfo.alexBranch,
        address: contactInfo.alexBranch.address[lang],
      },
    };

    return responseData;
  }

  findRelatedSites(lang: string): RelatedSite[] {
    const responseData = relatedSite.map((item) => ({
      ...item,
      name: item.name[lang],
    }));

    return responseData;
  }

  findAnnualReports(lang: string): NamedLink[] {
    const responseData = annualReports.map((item) => ({
      url: item.url[lang],
      name: item.name[lang],
    }));
    return responseData;
  }

  findSurveys(lang: string): NamedLink[] {
    const responseData = surveys.map((item) => ({
      url: item.url,
      name: item.name[lang],
    }));
    return responseData;
  }

  findElectronicSignatureFiles(lang: string): ElectronicSignatureFile[] {      
    const responseData =  Object.values(
      electronicSignatureFiles.reduce<Record<string | null, { name: string | null, items: NamedLink[] }>>(
        (acc, item) => {
          const key = item.type ?? null;
          (acc[key] ??= { name: key, items: [] }).items.push(item);
          return acc;
        },
        {}
      )
    );

    return responseData;
  }

  async findDirectors(lang: string): Promise<UserDirector[]> {
    const directors = await this.directorsRepository.find();

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

  findLawsPage(lang: string, pageName: LawPage): NamedLink[] {
    let data: {name: {en: string; ar: string}, url: string }[];
    switch(pageName) {
      case LawPage.ImportantLinks:
        data = importantLinks;
        break;
      case LawPage.Laws:
        data = workLaws;
        break;
      case LawPage.OtherLawsRegulatingWork:
        data = generalRules;
        break;
      case LawPage.RulesSettlementGuaranteeFund:
        data = fundRules;
        break;
    }

    const responseData = data.map((item) => ({
      name: item.name[lang],
      url: item.url,
    }));

    return responseData;
  }

  findMembersForms(lang: string): NamedLink[] {
    const responseData = membersForms.map((item) => ({
      url: item.url,
      name: item.name[lang],
    }));
    return responseData;
  }

  findAwards(lang: string): Award[] {
    const responseData = awards.map((award) => ({
      ...award,
      description: localizedValue(award.description, lang),
    }));

    return responseData;
  }

  findDocumentaries(lang: string): DocumentaryVideo[] {
    const responseData = documentaries.map((doc) => ({
      ...doc,
      name: localizedValue(doc.name, lang),
    }));

    return responseData;
  }

  findDocumentary(lang: string, id: number): DocumentaryVideo {
    const documentary = documentaries.find(doc => doc.id === id)

    const responseData = {
      ...documentary,
      name: localizedValue(documentary.name, lang),
    };

    return responseData;
  }


}
