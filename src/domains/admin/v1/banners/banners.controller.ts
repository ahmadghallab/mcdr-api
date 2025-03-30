import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Admin } from '../admins/entities/admin.entity';
import { AuthAdmin } from '../auth/auth-admin.decorator';

@Controller()
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(
    @AuthAdmin() user: Admin,
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
