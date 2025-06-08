import { Controller, Get, Headers } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Public()
  @Get()
  findAll(
    @Headers('accept-language') lang: string
  ) {
    return this.highlightsService.findAll(lang);
  }
}
