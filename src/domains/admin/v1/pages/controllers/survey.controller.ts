import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyService } from '../services/survey.service';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';

@Controller('data-reports')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @Post('surveys')
  create(
    @Body() CreateSurveyDto: CreateSurveyDto
  ) {
    return this.surveyService.create(CreateSurveyDto);
  }

  @Get('surveys')
  findAll() {
    return this.surveyService.findAll();
  }

  @Get('surveys/:id')
  findOne(
    @Param('id') id: string
  ) {
    return this.surveyService.findOne(+id);
  }

  @Patch('surveys/:id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }

  @Delete('surveys/:id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(+id);
  }
}
