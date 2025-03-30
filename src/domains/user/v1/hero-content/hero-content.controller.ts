import { Controller, Get, Headers } from '@nestjs/common';
import { HeroContentService } from './hero-content.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class HeroContentController {
  constructor(private readonly heroContentService: HeroContentService) {}

  @Public()
  @Get()
  findHeroContent(
    @Headers('accept-language') lang: string
  ) {
    return this.heroContentService.findAll(lang);
  }
}
