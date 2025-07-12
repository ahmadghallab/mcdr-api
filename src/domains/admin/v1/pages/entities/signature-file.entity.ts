import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SignatureType } from "../enums/signature-type";
import { PublishStatus } from "src/core/common/enums/publish-status.enum";

@Entity('signature_files')
export class SignatureFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'smallint', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: SignatureType, nullable: true })
  type?: SignatureType;

  @Column({ type: 'enum', enum: PublishStatus, default: PublishStatus.Draft })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
