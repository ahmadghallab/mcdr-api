import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    return this.articlesRepository.save({...createArticleDto, createdBy: user});
  }

  async findAll(lang?: string): Promise<Article[]> {
    const articles = await this.articlesRepository.find({
      relations: {
        createdBy: true,
      },
    });

    if (!lang) return articles;

    const localizedArticles = articles.map(article => ({
      ...article,
      title: article.title[lang],
      body: article.body[lang],
    }))
    return localizedArticles;
  }

  async findOne(id: number, lang?: string): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });

    if (!article) throw new NotFoundException();

    if (!lang) return article;

    const localizedArticles = {
      ...article,
      title: article.title[lang],
      body: article.body[lang],
    } 

    return localizedArticles;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    return this.articlesRepository.save({...article, ...updateArticleDto});
  }

  async remove(id: number): Promise<void> {
    await this.articlesRepository.delete(id);
  }

}
