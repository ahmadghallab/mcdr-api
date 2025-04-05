import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isPublished } from 'src/core/filters/published.filter';
import { Solution } from 'src/domains/admin/v1/solutions/entities/solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SolutionsService {

  constructor(
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>
  ) {}

  async findAll(lang: string): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.find({
      where: isPublished(),
    });

    const localizedSolutions = solutions.map(solution => ({
      ...solution,
      title: solution.title[lang],
      body: solution.body[lang],
    }))

    return localizedSolutions;
  }
}
