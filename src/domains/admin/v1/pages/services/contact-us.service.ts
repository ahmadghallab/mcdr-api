import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUs } from '../entities/contact.entity';
import { CreateContactUsDto } from '../dto/create-contact-us.dto';
import { UpdateContactUsDto } from '../dto/update-contact-us.dto';
import { SupportCategory } from 'src/core/common/enums/support-category.enum';

@Injectable()
export class ContactUsService {

  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}

  async findOne(department: SupportCategory): Promise<ContactUs> {
    const contact = await this.contactUsRepository.findOne({ where: { department } });
    return contact;
  }

  async create(createDto: CreateContactUsDto): Promise<ContactUs> {
    return this.contactUsRepository.save(createDto);
  }

  async update(id: number, updateDto: UpdateContactUsDto): Promise<ContactUs> {
    const contact = await this.contactUsRepository.findOneByOrFail({ id });
    return this.contactUsRepository.save({...contact, ...updateDto});
  }

}
