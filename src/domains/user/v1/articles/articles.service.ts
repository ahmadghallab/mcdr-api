import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { localizeContent } from 'src/core/common/utils/localize.util';
import { isPublished } from 'src/core/filters/published.filter';
import { Article } from 'src/domains/admin/v1/articles/entities/article.entity';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>
  ) {}

  async findAll(lang?: string): Promise<Partial<Article>[]> {
    const articles = await this.articlesRepository.find({
      where: isPublished(),
      order: { createdAt: 'DESC' },
    });

    const localizedArticles = articles.map(article => ({
      id: article.id,
      createdAt: article.createdAt,
      ...localizeContent(article, lang, ["title", "body"]),
    }))

    return localizedArticles;
  }

  async findOne(id: number, lang?: string): Promise<Partial<Article>> {
    try {
      const article = await this.articlesRepository.findOneByOrFail({ id, ...isPublished() });

      const localizedArticles = {
        id: article.id,
        createdAt: article.createdAt,
        ...localizeContent(article, lang, ["title", "body", "content"]),
      } 

      return localizedArticles;
    } catch (err) {
      throw new NotFoundException('Article not found');
    }
  }

}
