import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { SupportCategory } from 'src/core/common/enums/support-category.enum';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Searchable } from 'src/core/search/searchable.decorator';
import { SearchHrefBuilder } from 'src/core/search/search-href.builder';

@Searchable({
  index: 'global',
  type: 'faq',
  chunked: true,
  pick: ['qEn', 'qAr', 'aEn', 'aAr'],
  extra: (faq: Faq) => ({
    href: SearchHrefBuilder.forFaq(faq.department),
  }),
  condition: (entity: Faq) => entity.status === PublishStatus.Published,
})
@Entity('faqs')
@Index('status_department_idx', ['status', 'department'])
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SupportCategory, name: 'department' })
  department: SupportCategory;

  @Column({ type: 'varchar', length: 255, name: 'q_en' })
  qEn: string;

  @Column({ type: 'varchar', length: 255, name: 'q_ar' })
  qAr: string;

  @Column({ type: 'text', name: 'a_en' })
  aEn: string;

  @Column({ type: 'text', name: 'a_ar' })
  aAr: string;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
