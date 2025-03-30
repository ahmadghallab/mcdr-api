import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

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

  @Column({ type: 'text', name: 'content_en' })
  contentEn: string;

  @Column({ type: 'text', name: 'content_ar' })
  contentAr: string;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
