import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "json"})
  title: { en: string, ar: string }

  @Column({type: "json"})
  body: { en: string, ar: string }

  @ManyToOne((type) => User, (user) => user.articles)
  user: User

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
