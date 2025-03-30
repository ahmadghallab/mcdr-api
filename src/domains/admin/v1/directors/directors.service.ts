import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';

@Injectable()
export class DirectorsService {

  constructor(
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>
  ) {}

  async create(createDirectorDto: CreateDirectorDto, user: Admin): Promise<Director> {
    return this.directorsRepository.save(createDirectorDto);
  }

  async findAll(): Promise<Director[]> {
    const directors = await this.directorsRepository.find();

    return directors;
  }

  async findOne(id: number): Promise<Director> {
    return await this.directorsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const director = await this.findOne(id);
    return this.directorsRepository.save({...director, ...updateDirectorDto});
  }

  async remove(id: number): Promise<void> {
    await this.directorsRepository.delete(id);
  }

}
