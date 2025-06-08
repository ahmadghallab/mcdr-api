import { Controller, Get, Body, Patch, Post } from '@nestjs/common';
import { UpdateContactUsDto } from '../dto/update-contact-us.dto';
import { ContactUsService } from '../services/contact-us.service';
import { CreateContactUsDto } from '../dto/create-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
  ) {}

  @Get()
  findOne() {
    return this.contactUsService.findOne();
  }

  @Post()
  create(@Body() createDto: CreateContactUsDto) {
    return this.contactUsService.create(createDto);
  }

  @Patch()
  update(@Body() updateDto: UpdateContactUsDto) {
    return this.contactUsService.update(updateDto);
  }
}
