import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Searchable } from 'src/core/search/searchable.decorator';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';

@Searchable({
  index: 'global',
  type: 'article',
  pick: ['titleEn', 'titleAr', 'bodyEn', 'bodyAr', 'contentEn', 'contentAr'],
  extra: (entity: Article) => ({
    href: SearchHrefBuilder.forArticle(entity.id)
  }),
  condition: (entity: Article) => entity.status === PublishStatus.Published,
})
@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title_en' })
  titleEn: string;

  @Column({ type: 'varchar', length: 255, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'text', name: 'body_en' })
  bodyEn: string;

  @Column({ type: 'text', name: 'body_ar' })
  bodyAr: string;

  @Column({ type: 'text', nullable: true, name: 'content_en' })
  contentEn?: string;

  @Column({ type: 'text', nullable: true, name: 'content_ar' })
  contentAr?: string;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
