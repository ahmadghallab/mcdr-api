import { Controller, Get, Body, Patch, Post, Query, Param } from '@nestjs/common';
import { UpdateContactUsDto } from '../dto/update-contact-us.dto';
import { ContactUsService } from '../services/contact-us.service';
import { CreateContactUsDto } from '../dto/create-contact-us.dto';
import { ContactInfoDto } from 'src/domains/user/v1/pages/pages.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
  ) {}

  @Get()
  findOne(
    @Query() query: ContactInfoDto
  ) {
    return this.contactUsService.findOne(query.department);
  }

  @Post()
  create(@Body() createDto: CreateContactUsDto) {
    return this.contactUsService.create(createDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContactUsDto
  ) {
    return this.contactUsService.update(+id, updateDto);
  }
}
