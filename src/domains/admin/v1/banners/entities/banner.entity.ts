import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  description: { en: string, ar: string }

  @ManyToOne((type) => User, (user) => user.banners)
  createdBy: User

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
