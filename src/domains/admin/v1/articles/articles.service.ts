import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class ArticlesService {

  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto, user: Admin): Promise<Article> {
    return this.articlesRepository.save(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.articlesRepository.find();

    return articles;
  }

  async findOne(id: number): Promise<Article> {
    try {
      return await this.articlesRepository.findOneByOrFail({ id });
    } catch(e) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    return this.articlesRepository.save({...article, ...updateArticleDto});
  }

  async remove(id: number): Promise<void> {
    await this.articlesRepository.remove(await this.findOne(id));
  }

}
