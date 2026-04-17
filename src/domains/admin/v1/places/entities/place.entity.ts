import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { LocationType } from 'src/core/common/enums/location-type.enum';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { Searchable } from 'src/core/search/searchable.decorator';
import { buildPlaceSearchableText } from '../../pages/utils/place.search.util';

@Searchable({
  index: 'global',
  type: 'place',
  pick: ['address.en', 'address.ar'],
  extra: (entity: Place) => ({
    type: entity.type,
    href: SearchHrefBuilder.forPlace(entity.type),
    searchable_text: buildPlaceSearchableText(entity)
  }),
  condition: (entity: Place) => entity.status === PublishStatus.Published,
})
@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', name: 'address' })
  address: TranslationDto;

  @Column({ type: 'json', nullable: true, name: 'phones' })
  phones?: string[];

  @Column({ type: 'text', name: 'iframe_src' })
  iframeSrc: string;

  @Column({ type: 'enum', enum: LocationType, name: 'type' })
  type: LocationType;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}