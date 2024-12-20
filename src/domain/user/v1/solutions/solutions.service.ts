import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from 'src/domain/admin/v1/solutions/entities/solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolutionsService {

  constructor(
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>
  ) {}

  async findAll(lang: string): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.find({
      relations: {
        createdBy: true,
      },
    });

    const localizedSolutions = solutions.map(solution => ({
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    }))
    return localizedSolutions;
  }

  async findOne(id: number, lang: string): Promise<Solution> {
    const solution = await this.solutionsRepository.findOneByOrFail({ id });

    const localizedSolutions = {
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    } 

    return localizedSolutions;
  }

}
