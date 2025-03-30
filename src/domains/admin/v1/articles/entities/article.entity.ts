import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

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
