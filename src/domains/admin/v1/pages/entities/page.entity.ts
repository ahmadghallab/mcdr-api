import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Searchable } from 'src/core/search/searchable.decorator';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';

@Searchable({
  index: 'global',
  type: 'page',
  pick: ['titleEn', 'titleAr', 'contentEn', 'contentAr'],
  extra: (entity: Page) => ({
    href: SearchHrefBuilder.forPage(entity.slug)
  }),
  condition: (entity: Page) => entity.status === PublishStatus.Published,
})
@Entity('pages')
@Index('status_slug_idx', ['status', 'slug'])
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'slug' })
  slug: string;

  @Column({ type: 'varchar', length: 255, name: 'section' })
  section: string;

  @Column({ type: 'varchar', length: 255, name: 'title_en' })
  titleEn: string;

  @Column({ type: 'varchar', length: 255, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'mediumtext', name: 'content_en' })
  contentEn: string;

  @Column({ type: 'mediumtext', name: 'content_ar' })
  contentAr: string;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
