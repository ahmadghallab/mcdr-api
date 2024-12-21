import { Controller, Get, Param, Headers } from '@nestjs/common';
import { BannersService } from './banners.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Public()
  @Get()
  findAll(
    @Headers('accept-language') lang: string
  ) {
    return this.bannersService.findAll(lang);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }
}
