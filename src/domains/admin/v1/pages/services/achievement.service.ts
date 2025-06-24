import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAchievementDto } from '../dto/create-achievement.dto';
import { UpdateAchievementDto } from '../dto/update-achievement.dto';
import { Achievement } from '../entities/achievement.entity';

@Injectable()
export class AchievementService {

  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  
  async findAll(): Promise<Achievement[]> {
    const documentaries = await this.achievementRepository.find();
    return documentaries;
  }

  async findOne(id: number): Promise<Achievement> {
    const achievement = await this.achievementRepository.findOneByOrFail({ id });
    return achievement;
  }

  async create(createAchievementDto: CreateAchievementDto): Promise<Achievement> {
    return this.achievementRepository.save(createAchievementDto);
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto): Promise<Achievement> {
    const achievement = await this.achievementRepository.findOneByOrFail({ id });
    return this.achievementRepository.save({...achievement, ...updateAchievementDto});
  }

  async remove(id: number): Promise<void> {
    await this.achievementRepository.delete(id);
  }
}
