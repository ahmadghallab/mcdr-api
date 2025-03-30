import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class PagesService {

  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>
  ) {}

  async create(createPageDto: CreatePageDto, user: Admin): Promise<Page> {
    return this.pagesRepository.save(createPageDto);
  }

  async findAll(): Promise<Page[]> {
    const pages = await this.pagesRepository.find();

    return pages;
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
