import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SolutionsService {

  constructor(
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>
  ) {}

  async create(createSolutionDto: CreateSolutionDto, user: User): Promise<Solution> {
    return this.solutionsRepository.save({...createSolutionDto, createdBy: user});
  }

  async findAll(lang?: string): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.find({
      relations: {
        createdBy: true,
      },
    });

    if (!lang) return solutions;

    const localizedSolutions = solutions.map(solution => ({
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    }))
    return localizedSolutions;
  }

  async findOne(id: number, lang?: string): Promise<Solution> {
    const solution = await this.solutionsRepository.findOneBy({ id });

    if (!solution) throw new NotFoundException();

    if (!lang) return solution;

    const localizedSolutions = {
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    } 

    return localizedSolutions;
  }

  async update(id: number, updateSolutionDto: UpdateSolutionDto): Promise<Solution> {
    const solution = await this.findOne(id);
    return this.solutionsRepository.save({...solution, ...updateSolutionDto});
  }

  async remove(id: number): Promise<void> {
    await this.solutionsRepository.delete(id);
  }

}
