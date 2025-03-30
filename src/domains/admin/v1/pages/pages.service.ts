import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';
import { GroupedPagesBySection } from './pages.interfaces';
import { Director } from '../directors/entities/director.entity';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { Faq } from '../faqs/entities/faq.entity';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>
  ) {}

  async create(createPageDto: CreatePageDto, user: Admin): Promise<Page> {
    return this.pagesRepository.save(createPageDto);
  }

  async findAll(): Promise<GroupedPagesBySection[]> {
    const pages = await this.pagesRepository.find();

    const groupBySection = (data: Page[]) =>
      Object.values(
        data.reduce<Record<string, GroupedPagesBySection>>((acc, item) => {
          const key = item.section!;
          (acc[key] ??= { section: key, pages: [] }).pages.push(item);
          return acc;
        }, {})
      );
    const responseData =  groupBySection(pages);

    return responseData;
  }

  async findDirectors(): Promise<Director[]> {
    const directors = await this.directorsRepository.find();

    return directors;
  }

  async findFaqs(department: FaqDepartment): Promise<Faq[]> {
    const faqs = await this.faqsRepository.findBy({ department });

    return faqs;
  }

  async findOne(id: number): Promise<Page> {
    return await this.pagesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.findOne(id);
    return this.pagesRepository.save({...page, ...updatePageDto});
  }

  async remove(id: number): Promise<void> {
    await this.pagesRepository.delete(id);
  }

}
