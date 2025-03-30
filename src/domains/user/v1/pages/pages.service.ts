import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { localizeContent } from 'src/core/common/utils/localize.util';
import { Faq } from 'src/domains/admin/v1/faqs/entities/faq.entity';
import { Page } from 'src/domains/admin/v1/pages/entities/page.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>,
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

}
