import { PublishStatus } from "src/core/common/enums/publish-status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  description: { en: string, ar: string }

  @Column({ type: 'json', nullable: true })
  href: { en: string, ar: string } | null;

  @Column({ default: false, name: 'is_external' })
  isExternal: boolean;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
