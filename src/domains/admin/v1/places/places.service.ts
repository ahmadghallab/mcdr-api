import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { Repository } from 'typeorm';
import { Admin } from '../admins/entities/admin.entity';
import { ReorderDto } from '../reorder/reorder.dto';
import { ReorderService } from '../reorder/reorder.service';
import { FindAllPlacesDto } from './dto/find-all-places.dto';
import { ORDER_BY_ORDER_ASC } from 'src/core/utils/order.util';

@Injectable()
export class PlacesService {

  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
    private readonly reorderService: ReorderService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto, user: Admin): Promise<Place> {
    return this.placesRepository.save({...createPlaceDto, createdBy: user});
  }

  async findAll(placesQueryDto: FindAllPlacesDto): Promise<Place[]> {
    const { type } = placesQueryDto;

    const places = await this.placesRepository.find({
      where: { type },
      order: ORDER_BY_ORDER_ASC
    });

    return places;
  }

  async findOne(id: number): Promise<Place> {
    return await this.placesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);
    return this.placesRepository.save({...place, ...updatePlaceDto});
  }

  async reorder(dto: ReorderDto): Promise<void> {
    return this.reorderService.reorder(this.placesRepository, dto.items);
  }

  async remove(id: number): Promise<void> {
    await this.placesRepository.delete(id);
  }
}
