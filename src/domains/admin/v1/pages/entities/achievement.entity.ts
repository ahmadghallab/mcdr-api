import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { Searchable } from 'src/core/search/searchable.decorator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Searchable({
  index: 'global',
  type: 'achievement',
  pick: ['description.en', 'description.ar'],
  extra: () => ({
    href: SearchHrefBuilder.forAchievement()
  }),
})
@Entity('achievements')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  date?: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ type: 'json' })
  description: Translation;

  @Column({ type: 'smallint', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
