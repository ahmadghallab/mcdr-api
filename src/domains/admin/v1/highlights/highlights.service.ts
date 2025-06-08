import { Injectable } from '@nestjs/common';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Highlight } from './entities/highlight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class HighlightsService {

  constructor(
    @InjectRepository(Highlight)
    private readonly highlightsRepository: Repository<Highlight>
  ) {}

  create(createHighlightDto: CreateHighlightDto, user: Admin): Promise<Highlight> {
    return this.highlightsRepository.save(createHighlightDto)
  }

  async findAll(): Promise<Highlight[]> {
    const highlights = await this.highlightsRepository.find();

    return highlights;
  }

  async findOne(id: number): Promise<Highlight> {
    return await this.highlightsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateHighlightDto: UpdateHighlightDto): Promise<Highlight> {
    const highlight = await this.findOne(id);
    return await this.highlightsRepository.save({...highlight, ...updateHighlightDto});
  }

  async remove(id: number): Promise<void> {
    await this.highlightsRepository.delete(id);
  }
}
