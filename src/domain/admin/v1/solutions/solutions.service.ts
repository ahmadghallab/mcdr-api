import { Injectable } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SolutionsService {

  constructor(
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>
  ) {}

  async create(createSolutionDto: CreateSolutionDto, user: User): Promise<Solution> {
    return this.solutionsRepository.save({...createSolutionDto, createdBy: user});
  }

  async findAll(): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.find({
      relations: {
        createdBy: true,
      },
    });

    return solutions;
  }

  async findOne(id: number): Promise<Solution> {
    return await this.solutionsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateSolutionDto: UpdateSolutionDto): Promise<Solution> {
    const solution = await this.findOne(id);
    return this.solutionsRepository.save({...solution, ...updateSolutionDto});
  }

  async remove(id: number): Promise<void> {
    await this.solutionsRepository.delete(id);
  }

}
