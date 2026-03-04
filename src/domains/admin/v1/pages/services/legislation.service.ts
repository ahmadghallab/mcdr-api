import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLegislationDto } from '../dto/create-legislation.dto';
import { UpdateLegislationDto } from '../dto/update-legislation.dto';
import { Legislation } from '../entities/legislation.entity';
import { LegislationType } from '../enums/legislation-type.enum';
import { ORDER_BY_ORDER_ASC } from 'src/core/utils/order.util';
import { ReorderDto } from '../../reorder/reorder.dto';
import { ReorderService } from '../../reorder/reorder.service';

@Injectable()
export class LegislationService {

  constructor(
    @InjectRepository(Legislation)
    private readonly legislationRepository: Repository<Legislation>,
    private readonly reorderService: ReorderService,
  ) {}

  
  async findAll(type: LegislationType): Promise<Legislation[]> {
    const legislations = await this.legislationRepository.find({
      where: { type },
      order: ORDER_BY_ORDER_ASC
    });
    
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

  async reorder(dto: ReorderDto): Promise<void> {
    return this.reorderService.reorder(this.legislationRepository, dto.items);
  }
}
