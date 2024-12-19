import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Public } from 'src/auth/auth.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  create(
    @AuthUser() userDto: User,
    @Body() createSolutionDto: CreateSolutionDto
  ) {
    return this.solutionsService.create(createSolutionDto, userDto);
  }

  @Public()
  @Get()
  findAll(@Headers('accept-language') lang: string) {
    return this.solutionsService.findAll(lang);
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('accept-language') lang: string
  ) {
    return this.solutionsService.findOne(+id, lang);
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
