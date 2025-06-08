import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BranchInfo } from "../interfaces/contact-us.interface";

@Entity('contact_us')
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  hotline: string;

  @Column('json')
  branches: BranchInfo[];
}
