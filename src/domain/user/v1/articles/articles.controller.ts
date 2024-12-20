import { Controller, Get,Param, Headers } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Public } from 'src/domain/admin/v1/auth/auth.decorator';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

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
}
