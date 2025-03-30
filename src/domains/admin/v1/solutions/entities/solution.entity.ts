import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { TranslationDto } from 'src/core/common/dto/translation.dto';

@Entity('solutions')
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', name: 'title' })
  title: TranslationDto

  @Column({ type: 'json', name: 'body' })
  body: TranslationDto

  @Column({ type: 'varchar', length: 255, name: 'file_url' })
  fileUrl: string;

  @Column({ type: 'varchar', length: 255, name: 'href' })
  href: string;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  private static host: string;

  static setHost(host: string) {
    this.host = host;
  }
}