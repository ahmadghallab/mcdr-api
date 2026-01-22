import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BranchInfo } from "../interfaces/pages.interfaces";
import { Translation } from "src/core/common/types/translation.type";
import { SupportCategory } from "src/core/common/enums/support-category.enum";

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

  @Column({ type: 'json', name: 'work_hours' })
  workHours: Translation;

  @Column({ type: 'enum', enum: SupportCategory, name: 'department' })
  department: SupportCategory;
}
