import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
