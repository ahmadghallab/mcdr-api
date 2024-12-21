import { Expose } from "class-transformer";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Solution {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fileName: string

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

  private static host: string;

  static setHost(host: string) {
    this.host = host;
  }

  @Expose()
  get filePath(): string {
    const host = Solution.host;
    return `${host}/uploads/${this.fileName}`;
  }
}
