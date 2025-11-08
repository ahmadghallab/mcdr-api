import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/domains/admin/v1/banners/entities/banner.entity';
import { Repository } from 'typeorm';
import { isPublished } from 'src/core/filters/published.filter';

@Injectable()
export class BannersService {

  constructor(
    @InjectRepository(Banner)
    private readonly bannersRepository: Repository<Banner>
  ) {}

  async findAll(lang: string): Promise<Banner[]> {
    const banners = await this.bannersRepository.find({
      where: isPublished(),
    });

    const localizedBanners = banners.map(banner => ({
      ...banner,
      title: banner.title[lang],
      description: banner.description[lang],
      href: banner.href ? banner.href[lang] : null
    }));

    return localizedBanners;
  }
}
