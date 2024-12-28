import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/domains/admin/v1/banners/entities/banner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BannersService {

  constructor(
    @InjectRepository(Banner)
    private readonly bannersRepository: Repository<Banner>
  ) {}

  async findAll(lang: string): Promise<Banner[]> {
    const banners = await this.bannersRepository.findBy({ isPublished: true });

    const localizedBanners = banners.map(banner => ({
      ...banner,
      title: banner.title[lang],
      description: banner.description[lang],
    }));

    return localizedBanners;
  }

  async findOne(id: number, lang?: string): Promise<Banner> {
    const banner = await this.bannersRepository.findOneByOrFail({ id });

    const localizedBanner = {
      ...banner,
      title: banner.title[lang],
      description: banner.description[lang],
    }
    return localizedBanner;
  }
}
