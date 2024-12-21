import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';

@Controller()
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Public()
  @Get()
  findAll(@Headers('accept-language') lang: string) {
    return this.solutionsService.findAll(lang);
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('accept-language') lang: string
  ) {
    return this.solutionsService.findOne(+id, lang);
  }
}
