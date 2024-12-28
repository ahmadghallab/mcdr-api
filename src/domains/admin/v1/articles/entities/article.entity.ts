import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  body: { en: string, ar: string }

  @Column({ default: false })
  isPublished: boolean

  @ManyToOne((type) => User, (user) => user.articles)
  createdBy: User

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
