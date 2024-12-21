import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller()
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  create(
    @AuthUser() userDto: User,
    @Body() createSolutionDto: CreateSolutionDto
  ) {
    return this.solutionsService.create(createSolutionDto, userDto);
  }

  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.solutionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionsService.update(+id, updateSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(+id);
  }
}
