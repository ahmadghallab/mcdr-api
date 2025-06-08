import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  
  async findAll(): Promise<Survey[]> {
    const surveys = await this.surveyRepository.find();
    return surveys;
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOneByOrFail({ id });
    return survey;
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyRepository.save(createSurveyDto);
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.surveyRepository.findOneByOrFail({ id });
    return this.surveyRepository.save({...survey, ...updateSurveyDto});
  }

  async remove(id: number): Promise<void> {
    await this.surveyRepository.delete(id);
  }
}
