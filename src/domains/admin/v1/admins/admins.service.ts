import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ConfigService } from '@nestjs/config';
import { generatePassword } from 'src/core/utils/password.util';
import { ChangePasswordDto } from './dto/change-password.dto';

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
      throw new BadRequestException('This email address is already in use.');
    }

    const password = generatePassword();
    
    const hashedPassword = await this.hashPassword(password);

    const admin = await this.adminsRepository.save({ ...createAdminDto, password: hashedPassword });

    return { ...admin, password };
  }

  async findAll(adminDto: Admin): Promise<Admin[]> {
    return await this.adminsRepository.find({
      where: {
        id: Not(adminDto.id),
      },
    });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return admin
  }

  async findEmail(email: string): Promise<Admin | null> {
    return await this.adminsRepository.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    return this.adminsRepository.save({...admin, ...updateAdminDto});
  }

  async updateRefreshToken(userId: number, hashedToken: string) {
    await this.adminsRepository.update(userId, { refreshToken: hashedToken });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Admin> {
    const { oldPassword, newPassword } = changePasswordDto;

    const admin = await this.findOne(id);

    await this.comparePasswords(oldPassword, admin.password);

    admin.password = await this.hashPassword(newPassword);

    await this.adminsRepository.save(admin);

    return admin;
  }

  async resetPassword(id: number): Promise<Admin> {
    const admin = await this.findOne(id);

    const password = generatePassword();
    
    admin.password = await this.hashPassword(password);

    await this.adminsRepository.save(admin);

    return { ...admin, password };
  }

  private async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(
      password, 
      this.configService.get('jwt').saltOrRounds
    );
    return hashedPassword;
  }

  private async comparePasswords(data: string, encrypted: string) {
    const isPasswordValid = await bcrypt.compare(data, encrypted);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }
  }
}
