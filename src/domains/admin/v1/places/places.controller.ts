import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Admin } from '../admins/entities/admin.entity';
import { AuthAdmin } from '../auth/auth-admin.decorator';
import { ReorderDto } from '../reorder/reorder.dto';
import { FindAllPlacesDto } from './dto/find-all-places.dto';

@Controller()
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(
    @AuthAdmin() adminDto: Admin,
    @Body() createPlaceDto: CreatePlaceDto
  ) {
    return this.placesService.create(createPlaceDto, adminDto);
  }

  @Get()
  findAll(
    @Query() placesQueryDto: FindAllPlacesDto,
  ) {
    return this.placesService.findAll(placesQueryDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.placesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Post('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.placesService.reorder(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
