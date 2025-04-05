import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'avatar_url' })
  avatarUrl: string;

  @Column({ type: 'json', name: 'title' })
  title: { en: string; ar: string };

  @Column({ type: 'json', name: 'name' })
  name: { en: string; ar: string };

  @Column({ type: 'json', name: 'position' })
  position: { en: string; ar: string };

  @Column({ type: 'json', nullable: true, name: 'bio' })
  bio?: { en: string; ar: string };

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status', default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
