import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUs } from '../entities/contact.entity';
import { CreateContactUsDto } from '../dto/create-contact-us.dto';
import { UpdateContactUsDto } from '../dto/update-contact-us.dto';

@Injectable()
export class ContactUsService {

  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}


  async findOne(): Promise<ContactUs> {
    const contact = await this.contactUsRepository.findOne({ where: {} });
    return contact;
  }

  async create(createDto: CreateContactUsDto): Promise<ContactUs> {
    return this.contactUsRepository.save(createDto);
  }

  async update(updateDto: UpdateContactUsDto): Promise<ContactUs> {
    const contact = await this.findOne();
    return this.contactUsRepository.save({...contact, ...updateDto});
  }

}
