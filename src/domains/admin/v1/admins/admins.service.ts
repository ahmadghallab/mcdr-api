
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
    private readonly configService: ConfigService
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const email = await this.findEmail(createAdminDto.email);

    if (email) {
      throw new BadRequestException('Already Exist');
    }
    
    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password, 
      this.configService.get('jwt').saltOrRounds
    );

    return this.adminsRepository.save(createAdminDto);
  }

  findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: number): Promise<Admin> {
    return this.adminsRepository.findOneBy({ id });
  }

  findEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    admin.email = updateAdminDto.email
    admin.password = updateAdminDto.password
    return this.adminsRepository.save(admin);
  }

  async updateRefreshToken(userId: number, hashedToken: string) {
    await this.adminsRepository.update(userId, { refreshToken: hashedToken });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }

}
