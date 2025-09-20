import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { LocationType } from 'src/core/common/enums/location-type.enum';
import { TranslationDto } from 'src/core/common/dto/translation.dto';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', name: 'address' })
  address: TranslationDto;

  @Column({ type: 'json', nullable: true, name: 'phones' })
  phones?: string[];

  @Column({ type: 'text', name: 'iframe_src' })
  iframeSrc: string;

  @Column({ type: 'enum', enum: LocationType, name: 'type' })
  type: LocationType;

  @Column({ type: 'smallint', default: 0, name: 'order' })
  order: number;

  @Column({ type: 'enum', enum: PublishStatus, name: 'status' })
  status: PublishStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}