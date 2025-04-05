import { Injectable } from '@nestjs/common';
import * as heroContent from './hero-content.json';
import { HeroContent } from './hero-content.interfaces';

@Injectable()
export class HeroContentService {
  async findAll(lang: string): Promise<HeroContent[]> {
    const localizedHeroContent = heroContent.map(banner => ({
      ...banner,
      title: banner.title[lang],
      body: banner.body[lang],
    }));

    return localizedHeroContent;
  }
}
