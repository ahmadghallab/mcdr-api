import { Controller, Get, Headers } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Public()
  @Get()
  findAll(
    @Headers('accept-language') lang: string
  ) {
    return this.placesService.findAll(lang);
  }
}
