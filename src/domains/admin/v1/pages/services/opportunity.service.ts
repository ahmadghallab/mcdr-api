import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpportunityDto } from '../dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import { Opportunity } from '../entities/opportunity.entity';

@Injectable()
export class OpportunityService {

  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  
  async findAll(): Promise<Opportunity[]> {
    const documentaries = await this.opportunityRepository.find();
    return documentaries;
  }

  async findOne(id: number): Promise<Opportunity> {
    const opportunity = await this.opportunityRepository.findOneByOrFail({ id });
    return opportunity;
  }

  async create(createOpportunityDto: CreateOpportunityDto): Promise<Opportunity> {
    return this.opportunityRepository.save(createOpportunityDto);
  }

  async update(id: number, updateOpportunityDto: UpdateOpportunityDto): Promise<Opportunity> {
    const opportunity = await this.opportunityRepository.findOneByOrFail({ id });
    return this.opportunityRepository.save({...opportunity, ...updateOpportunityDto});
  }

  async remove(id: number): Promise<void> {
    await this.opportunityRepository.delete(id);
  }
}
