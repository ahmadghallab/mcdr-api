import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

@Entity('faqs')
@Index('status_department_idx', ['status', 'department']) // Composite index
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FaqDepartment, name: 'department' })
  department: FaqDepartment;

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
