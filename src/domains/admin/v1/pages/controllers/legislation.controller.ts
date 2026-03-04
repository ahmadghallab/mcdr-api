import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LegislationService } from '../services/legislation.service';
import { CreateLegislationDto } from '../dto/create-legislation.dto';
import { UpdateLegislationDto } from '../dto/update-legislation.dto';
import { FindAllLegislationsDto } from '../dto/find-all-legislations.dto';
import { ReorderDto } from '../../reorder/reorder.dto';

@Controller('legislations')
export class LegislationController {
  constructor(
    private readonly legislationService: LegislationService,
  ) {}

  @Post()
  create(
    @Body() CreateLegislationDto: CreateLegislationDto
  ) {
    return this.legislationService.create(CreateLegislationDto);
  }

  @Get()
  findAll(
    @Query() query: FindAllLegislationsDto,
  ) {
    return this.legislationService.findAll(query.type);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.legislationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLegislationDto: UpdateLegislationDto) {
    return this.legislationService.update(+id, updateLegislationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.legislationService.remove(+id);
  }

  @Post('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.legislationService.reorder(dto);
  }
}
