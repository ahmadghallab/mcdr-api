import { PublishStatus } from "src/core/common/enums/publish-status.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('highlights')
export class Highlight {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  body: { en: string, ar: string }

  @Column({ type: 'varchar', length: 255 })
  href: string

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
