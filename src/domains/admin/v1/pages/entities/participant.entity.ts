import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { ParticipantType } from '../enums/participant-type.enum';

@Entity('participants')
@Index('status_type_idx', ['status', 'type'])
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'code' })
  code: string;

  @Column({ type: 'enum', enum: ParticipantType })
  type: ParticipantType;

  @Column({ type: 'varchar', length: 255, name: 'aname' })
  aname: string;

  @Column({ type: 'varchar', length: 255, name: 'ename' })
  ename: string;

  @Column({ type: 'varchar', length: 255, name: 'aaddress' })
  aaddress: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  eaddress: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fax: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  hotline: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: "json", nullable: true })
  board: { serl: string, aname: string, ename: string }[]

  @Column({ type: 'enum', enum: PublishStatus, name: 'status', default: PublishStatus.Draft })
  status: PublishStatus;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;
}
