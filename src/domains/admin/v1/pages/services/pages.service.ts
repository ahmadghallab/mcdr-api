import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from '../dto/create-page.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from '../entities/page.entity';
import { Repository } from 'typeorm';
import { Admin } from '../../admins/entities/admin.entity';
import { GroupedPagesBySection } from '../interfaces/pages.interfaces';
import { Director } from '../entities/director.entity';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { Faq } from '../entities/faq.entity';
import { CreateDirectorDto } from '../dto/create-director.dto';
import { UpdateDirectorDto } from '../dto/update-director.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { ReorderService } from '../../reorder/reorder.service';
import { ReorderDto } from '../../reorder/reorder.dto';
import { ORDER_BY_ORDER_ASC } from 'src/core/utils/order.util';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>,
    private readonly reorderService: ReorderService,
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

  async findOne(id: number): Promise<Page> {
    return await this.pagesRepository.findOneByOrFail({ id });
  }

  async findOneBySlug(slug: string): Promise<Page> {
    try {
      return await this.pagesRepository.findOneByOrFail({ slug });
    } catch(e) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.findOne(id);
    return this.pagesRepository.save({...page, ...updatePageDto});
  }

  async remove(id: number): Promise<void> {
    await this.pagesRepository.delete(id);
  }

  async findAllDirectors(): Promise<Director[]> {
    const directors = await this.directorsRepository.find();
    return directors;
  }

  async findOneDirector(id: number): Promise<Director> {
    const director = await this.directorsRepository.findOneByOrFail({ id });
    return director;
  }

  async createDirector(createDirectorDto: CreateDirectorDto): Promise<Director> {
    return this.directorsRepository.save(createDirectorDto);
  }

  async updateDirector(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const director = await this.directorsRepository.findOneByOrFail({ id });
    return this.directorsRepository.save({...director, ...updateDirectorDto});
  }

  async removeDirector(id: number): Promise<void> {
    await this.directorsRepository.delete(id);
  }

  async createFaq(createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqsRepository.save(createFaqDto);
  }

  async findAllFaqs(department: FaqDepartment): Promise<Faq[]> {
    const faqs = await this.faqsRepository.find({
      where: { department },
      order: ORDER_BY_ORDER_ASC
    });
    return faqs;
  }
  
  async findOneFaq(id: number): Promise<Faq> {
    return await this.faqsRepository.findOneByOrFail({ id });
  }

  async updateFaq(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.faqsRepository.findOneByOrFail({ id });
    return this.faqsRepository.save({...faq, ...updateFaqDto});
  }

  async reorderFaqs(dto: ReorderDto): Promise<void> {
    return this.reorderService.reorder(this.faqsRepository, dto.items);
  }

  async removeFaq(id: number): Promise<void> {
    await this.faqsRepository.delete(id);
  }
}
