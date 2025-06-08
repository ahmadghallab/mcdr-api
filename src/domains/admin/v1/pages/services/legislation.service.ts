import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLegislationDto } from '../dto/create-legislation.dto';
import { UpdateLegislationDto } from '../dto/update-legislation.dto';
import { Legislation } from '../entities/legislation.entity';
import { FindAllLegislationsDto } from '../dto/find-all-legislations.dto';
import { LegislationType } from '../enums/legislation-type.enum';

@Injectable()
export class LegislationService {

  constructor(
    @InjectRepository(Legislation)
    private readonly legislationRepository: Repository<Legislation>,
  ) {}

  
  async findAll(type: LegislationType): Promise<Legislation[]> {
    const legislations = await this.legislationRepository.findBy({ type });
    return legislations;
  }

  async findOne(id: number): Promise<Legislation> {
    const legislation = await this.legislationRepository.findOneByOrFail({ id });
    return legislation;
  }

  async create(createLegislationDto: CreateLegislationDto): Promise<Legislation> {
    return this.legislationRepository.save(createLegislationDto);
  }

  async update(id: number, updateLegislationDto: UpdateLegislationDto): Promise<Legislation> {
    const legislation = await this.legislationRepository.findOneByOrFail({ id });
    return this.legislationRepository.save({...legislation, ...updateLegislationDto});
  }

  async remove(id: number): Promise<void> {
    await this.legislationRepository.delete(id);
  }
}
