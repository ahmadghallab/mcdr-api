import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DocumentResourceType } from '../enums/document-resource-type.enum';

@Entity('document_resources')
export class DocumentResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    unique: true,
    type: 'enum',
    enum: DocumentResourceType,
  })
  type: DocumentResourceType; 

  @Column('json')
  data: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
