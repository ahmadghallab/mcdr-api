import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Solution {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fileUrl: string

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  body: { en: string, ar: string }

  @ManyToOne((type) => User, (user) => user.solutions)
  createdBy: User

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
