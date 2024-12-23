
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../../articles/entities/article.entity';
import { Solution } from '../../solutions/entities/solution.entity';
import { Place } from '../../places/entities/place.entity';
import { Banner } from '../../banners/entities/banner.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Article, (article) => article.createdBy)
  articles: Article[]

  @OneToMany(() => Solution, (solution) => solution.createdBy)
  solutions: Solution[]

  @OneToMany(() => Place, (place) => place.createdBy)
  places: Place[]

  @OneToMany(() => Banner, (banner) => banner.createdBy)
  banners: Banner[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
