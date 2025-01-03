import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Solution } from 'src/domains/admin/v1/solutions/entities/solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolutionsService {

  constructor(
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>
  ) {}

  async findAll(lang: string): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.findBy({ isPublished: true });

    const localizedSolutions = solutions.map(solution => ({
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    }))

    return plainToInstance(Solution, localizedSolutions);
  }

  async findOne(id: number, lang: string): Promise<Solution> {
    const solution = await this.solutionsRepository.findOneByOrFail({ id });

    const localizedSolutions = {
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    } 

    return plainToInstance(Solution, localizedSolutions)
  }

}
