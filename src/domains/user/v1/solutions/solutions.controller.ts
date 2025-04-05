import { Controller, Get, Headers } from '@nestjs/common';
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

}
