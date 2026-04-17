import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { LegislationType } from '../enums/legislation-type.enum';
import { Searchable } from 'src/core/search/searchable.decorator';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { buildFileSearchableText } from '../utils/file.search.util';

@Searchable({
  index: 'global',
  type: 'legislation',
  pick: ['name.en', 'name.ar'],
  extra: (entity: Legislation) => ({
    type: entity.type,
    href: SearchHrefBuilder.forLegislation(entity.type),
    searchable_text: buildFileSearchableText(entity),
  }),
  condition: (entity: Legislation) => entity.status === PublishStatus.Published,
})
@Entity('legislations')
export class Legislation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  url: Translation;

  @Column({ type: 'json' })
  name: Translation;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column({ type: 'smallint', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: LegislationType })
  type: LegislationType;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
