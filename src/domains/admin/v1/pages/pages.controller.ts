import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AuthAdmin } from '../auth/auth-admin.decorator';
import { Admin } from '../admins/entities/admin.entity';
import { ListFaqsDto } from './dto/list-faqs.dto';

@Controller()
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
  ) {}

  @Post('common')
  create(
    @AuthAdmin() adminDto: Admin,
    @Body() createPageDto: CreatePageDto
  ) {
    return this.pagesService.create(createPageDto, adminDto);
  }

  @Get('common')
  findAll() {
    return this.pagesService.findAll();
  }

  @Get('directors')
  findDirectors() {
    return this.pagesService.findDirectors();
  }

  @Get('faqs')
  findFaqs(
    @Query() query: ListFaqsDto
  ) {
    return this.pagesService.findFaqs(query.department);
  }

  @Get('common/:id')
  findOne(
    @Param('id') id: string
  ) {
    return this.pagesService.findOne(+id);
  }

  @Patch('common/:id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Delete('common/:id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}
