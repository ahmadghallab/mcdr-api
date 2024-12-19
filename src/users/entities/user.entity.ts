
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from 'src/articles/entities/article.entity';
import { Solution } from 'src/solutions/entities/solution.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[]

  @OneToMany(() => Solution, (solution) => solution.user)
  solutions: Solution[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
