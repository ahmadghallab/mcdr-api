import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { Searchable } from 'src/core/search/searchable.decorator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { buildDirectorSearchableText } from '../utils/director.search.util';

@Searchable({
  index: 'global',
  type: 'director',
  pick: ['name.en', 'name.ar'],
  extra: (entity: Director) => ({
    href: SearchHrefBuilder.forDirector(),
    searchable_text: buildDirectorSearchableText(entity),
  }),
  condition: (entity: Director) => entity.status === PublishStatus.Published,
})
@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'avatar_url' })
  avatarUrl: string;

  @Column({ type: 'json', name: 'title' })
  title: Translation;

  @Column({ type: 'json', name: 'name' })
  name: Translation;

  @Column({ type: 'json', name: 'position' })
  position: Translation;

  @Column({ type: 'json', nullable: true, name: 'bio' })
  bio?: Translation;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status', default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
