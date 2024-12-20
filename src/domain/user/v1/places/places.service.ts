import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place, PlaceType } from 'src/domain/admin/v1/places/entities/place.entity';
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
      relations: {
        createdBy: true,
      },
    });

    const localizedPlaces = places.map(place => ({
      ...place,
      address: place.address[lang],
    }));


    return {
      couponExchangePlaces: localizedPlaces.filter(place => place.type === PlaceType.COUPON_EXCHANGE),
      eSignatureCerts: localizedPlaces.filter(place => place.type === PlaceType.E_SIGNATURE_CERTIFICATE),
    };
  }
}
