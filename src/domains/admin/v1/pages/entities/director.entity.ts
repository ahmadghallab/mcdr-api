import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { Translation } from 'src/core/common/types/translation.type';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'avatar_url' })
  avatarUrl: string;

  @Column({ type: 'json', name: 'title' })
  title: Translation;

  @Column({ type: 'json', name: 'name' })
  name: Translation;

  @Column({ type: 'json', name: 'position' })
  position: Translation;

  @Column({ type: 'json', nullable: true, name: 'bio' })
  bio?: Translation;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status', default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
