import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { OpportunityType } from '../enums/opportunity-type.enum';

@Entity('opportunities')
@Index('status_type_active_idx', ['status', 'type', 'isActive'])
export class Opportunity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OpportunityType, name: 'type' })
  type: OpportunityType;

  @Column({ type: 'varchar', length: 255, name: 'title_en' })
  titleEn: string;

  @Column({ type: 'varchar', length: 255, name: 'title_ar' })
  titleAr: string;

  @Column({ type: 'text', name: 'description_en' })
  descriptionEn: string;

  @Column({ type: 'text', name: 'description_ar' })
  descriptionAr: string;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
