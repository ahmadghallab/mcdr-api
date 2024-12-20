import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlacesService {

  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>
  ) {}

  async create(createPlaceDto: CreatePlaceDto, user: User): Promise<Place> {
    return this.placesRepository.save({...createPlaceDto, createdBy: user});
  }

  async findAll(lang?: string): Promise<Place[]> {
    const places = await this.placesRepository.find({
      relations: {
        createdBy: true,
      },
    });

    if (!lang) return places;

    const localizedPlaces = places.map(place => ({
      ...place,
      address: place.address[lang],
    }))
    return localizedPlaces;
  }

  async findOne(id: number, lang?: string): Promise<Place> {
    const place = await this.placesRepository.findOneBy({ id });

    if (!place) throw new NotFoundException();

    if (!lang) return place;

    const localizedPlaces = {
      ...place,
      address: place.address[lang],
    } 

    return localizedPlaces;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);
    return this.placesRepository.save({...place, ...updatePlaceDto});
  }

  async remove(id: number): Promise<void> {
    await this.placesRepository.delete(id);
  }
}
