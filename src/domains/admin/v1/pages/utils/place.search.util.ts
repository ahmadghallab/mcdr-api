import { createSearchBuilder } from "src/core/search/search.util";
import { Place } from "../../places/entities/place.entity";
import { locationTypeLabels } from "src/core/common/enums/location-type.enum";

export function buildPlaceSearchableText(place: Place): string {
  const { add, build } = createSearchBuilder();

  const type = locationTypeLabels[place.type]

  add(
    `${place.address.en}. This is a ${type.en} location. ${
      place.phones?.length ? `Contact: ${place.phones.join(', ')}.` : ''
    }`,

    `${place.address.ar}. هذا مكان من نوع ${type.ar}. ${
      place.phones?.length ? `للتواصل: ${place.phones.join('، ')}.` : ''
    }`
  );

  return build();
}