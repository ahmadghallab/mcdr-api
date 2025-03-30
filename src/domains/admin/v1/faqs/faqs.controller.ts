import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AuthAdmin } from '../auth/auth-admin.decorator';
import { Admin } from '../admins/entities/admin.entity';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';

@Controller()
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  create(
    @AuthAdmin() adminDto: Admin,
    @Body() createFaqDto: CreateFaqDto
  ) {
    return this.faqsService.create(createFaqDto, adminDto);
  }

  @Get()
  findAll(
    @Query() department: FaqDepartment
  ) {
    return this.faqsService.findAll(department);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.faqsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqsService.remove(+id);
  }
}
