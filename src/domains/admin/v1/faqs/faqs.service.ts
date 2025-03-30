import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';

@Injectable()
export class FaqsService {

  constructor(
    @InjectRepository(Faq)
    private readonly faqsRepository: Repository<Faq>
  ) {}

  async create(createFaqDto: CreateFaqDto, user: Admin): Promise<Faq> {
    return this.faqsRepository.save(createFaqDto);
  }

  async findAll(department: FaqDepartment): Promise<Faq[]> {
    const faqs = await this.faqsRepository.findBy({ department });

    return faqs;
  }

  async findOne(id: number): Promise<Faq> {
    return await this.faqsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.findOne(id);
    return this.faqsRepository.save({...faq, ...updateFaqDto});
  }

  async remove(id: number): Promise<void> {
    await this.faqsRepository.delete(id);
  }

}
