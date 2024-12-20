import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BannersService {

  constructor(
    @InjectRepository(Banner)
    private readonly bannersRepository: Repository<Banner>
  ) {}

  create(createBannerDto: CreateBannerDto, user: User): Promise<Banner> {
    return this.bannersRepository.save({...createBannerDto, createdBy: user})
  }

  async findAll(lang: string): Promise<Banner[]> {
    const banners = await this.bannersRepository.find({
      relations: { createdBy: true }
    });

    if (!lang) return banners;

    const localizedBanners = banners.map(banner => ({
      ...banner,
      title: banner.title[lang],
      description: banner.description[lang],
    }));

    return localizedBanners;
  }

  async findOne(id: number, lang?: string): Promise<Banner> {
    const banner = await this.bannersRepository.findOneByOrFail({ id });

    if (!lang) return banner;

    const localizedBanner = {
      ...banner,
      title: banner.title[lang],
      description: banner.description[lang],
    }
    return localizedBanner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    const banner = await this.findOne(id);
    return await this.bannersRepository.save({...banner, ...updateBannerDto});
  }

  async remove(id: number): Promise<void> {
    await this.bannersRepository.delete(id);
  }
}
