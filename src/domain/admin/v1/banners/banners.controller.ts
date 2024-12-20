import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Headers } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { User } from '../users/entities/user.entity';
import { AuthUser } from '../auth/auth-user.decorator';

@Controller()
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(
    @AuthUser() user: User,
    @Body() createBannerDto: CreateBannerDto
  ) {
    return this.bannersService.create(createBannerDto, user);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannersService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(+id);
  }
}
