import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { Searchable } from 'src/core/search/searchable.decorator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Searchable({
  index: 'global',
  type: 'documentary',
  pick: ['name.en', 'name.ar'],
  extra: () => ({
    href: SearchHrefBuilder.forDocumentary()
  }),
})
@Entity('documentaries')
export class Documentary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column('json')
  name: {
    ar: string;
    en: string;
  };

  @Column()
  duration: string;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
