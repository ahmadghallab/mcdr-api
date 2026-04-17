import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';
import { Searchable } from 'src/core/search/searchable.decorator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { buildFileSearchableText } from '../utils/file.search.util';

@Searchable({
  index: 'global',
  type: 'annual_report',
  pick: ['name.en', 'name.ar'],
  extra: (entity: AnnualReport) => ({
    href: SearchHrefBuilder.forAnnualReport(),
    searchable_text: buildFileSearchableText(entity),
  }),
  condition: (entity: AnnualReport) => entity.status === PublishStatus.Published,
})
@Entity('annual_reports')
export class AnnualReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  url: Translation;

  @Column({ type: 'json' })
  name: Translation;

  @Column({ type: 'smallint', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
