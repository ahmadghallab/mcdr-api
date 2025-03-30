import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { localizeContent } from 'src/core/common/utils/localize.util';
import { Article } from 'src/domains/admin/v1/articles/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>
  ) {}

  async findAll(lang?: string): Promise<Article[]> {
    const articles = await this.articlesRepository.find();

    const localizedArticles = articles.map(article => ({
      ...article,
      ...localizeContent(article, lang, ["title", "body", "content"]),
    }))

    return localizedArticles;
  }

  async findOne(id: number, lang: string): Promise<Article> {
    const article = await this.articlesRepository.findOneByOrFail({ id });

    const localizedArticles = {
      ...article,
      ...localizeContent(article, lang, ["title", "body", "content"]),
    } 

    return localizedArticles;
  }

}
