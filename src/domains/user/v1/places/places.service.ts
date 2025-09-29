import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationType } from 'src/core/common/enums/location-type.enum';
import { isPublished } from 'src/core/filters/published.filter';
import { ORDER_BY_ORDER_ASC } from 'src/core/utils/order.util';
import { Place } from 'src/domains/admin/v1/places/entities/place.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {

  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>
  ) {}

  async findAll(lang: string): Promise<{
    couponExchangePlaces: Place[],
    eSignatureCerts: Place[]
  }> {
    const places = await this.placesRepository.find({
      where: isPublished(),
      order: ORDER_BY_ORDER_ASC
    });

    const localizedPlaces = places.map(place => ({
      ...place,
      address: place.address[lang],
    }));


    return {
      couponExchangePlaces: localizedPlaces.filter(place => place.type === LocationType.CouponExchange),
      eSignatureCerts: localizedPlaces.filter(place => place.type === LocationType.ESignatureCertificate),
    };
  }
}
