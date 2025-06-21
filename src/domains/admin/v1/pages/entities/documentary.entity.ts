import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documentaries')
export class Documentary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'thumbnail_url', nullable: true })
  thumbnailUrl: string;

  @Column('json')
  name: {
    ar: string;
    en: string;
  };

  @Column()
  duration: string;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
