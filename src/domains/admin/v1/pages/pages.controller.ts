import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { AuthAdmin } from '../auth/auth-admin.decorator';
import { Admin } from '../admins/entities/admin.entity';
import { ListFaqsDto } from './dto/list-faqs.dto';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

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

  @Post('directors')
  createDirector(
    @Body() createDirectorDto: CreateDirectorDto
  ) {
    return this.pagesService.createDirector(createDirectorDto);
  }

  @Get('directors')
  findAllDirectors() {
    return this.pagesService.findAllDirectors();
  }

  @Get('directors/:id')
  findOneDirector(
    @Param('id') id: string
  ) {
    return this.pagesService.findOneDirector(+id);
  }

  @Patch('directors/:id')
  updateDirector(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.pagesService.updateDirector(+id, updateDirectorDto);
  }

  @Delete('directors/:id')
  removeDirector(@Param('id') id: string) {
    return this.pagesService.removeDirector(+id);
  }

  @Post('faqs')
  createFaq(
    @Body() createFaqDto: CreateFaqDto
  ) {
    return this.pagesService.createFaq(createFaqDto);
  }

  @Get('faqs')
  findAllFaqs(
    @Query() query: ListFaqsDto
  ) {
    return this.pagesService.findAllFaqs(query.department);
  }

  @Get('faqs/:id')
  findOneFaq(
    @Param('id') id: string
  ) {
    return this.pagesService.findOneFaq(+id);
  }

  @Patch('faqs/:id')
  updateFaq(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.pagesService.updateFaq(+id, updateFaqDto);
  }

  @Delete('faqs/:id')
  removeFaq(@Param('id') id: string) {
    return this.pagesService.removeFaq(+id);
  }
}
