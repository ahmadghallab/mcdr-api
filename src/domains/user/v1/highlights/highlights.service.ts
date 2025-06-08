import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Highlight } from 'src/domains/admin/v1/highlights/entities/highlight.entity';
import { Repository } from 'typeorm';
import { isPublished } from 'src/core/filters/published.filter';


@Injectable()
export class HighlightsService {

  constructor(
    @InjectRepository(Highlight)
    private readonly highlightsRepository: Repository<Highlight>
  ) {}

  async findAll(lang: string): Promise<Highlight[]> {
    const highlights = await this.highlightsRepository.find({
      where: isPublished(),
    });

    const localizedHighlights = highlights.map(highlight => ({
      ...highlight,
      title: highlight.title[lang],
      body: highlight.body[lang],
    }));

    return localizedHighlights;
  }
}
