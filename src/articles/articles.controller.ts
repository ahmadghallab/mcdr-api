import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from 'src/auth/auth.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(
    @AuthUser() userDto: User,
    @Body() createArticleDto: CreateArticleDto
  ) {
    return this.articlesService.create(createArticleDto, userDto);
  }

  @Public()
  @Get()
  findAll(@Headers('accept-language') lang: string) {
    return this.articlesService.findAll(lang);
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('accept-language') lang: string
  ) {
    return this.articlesService.findOne(+id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
