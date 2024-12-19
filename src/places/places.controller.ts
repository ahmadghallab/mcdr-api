import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Public } from 'src/auth/auth.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(
    @AuthUser() userDto: User,
    @Body() createPlaceDto: CreatePlaceDto
  ) {
    return this.placesService.create(createPlaceDto, userDto);
  }

  @Public()
  @Get()
  findAll(
    @Headers('accept-language') lang: string
  ) {
    return this.placesService.findAll(lang);
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('accept-language') lang: string
  ) {
    return this.placesService.findOne(+id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
