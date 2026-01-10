import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('files')
@Index(['context', 'createdAt'])
export class File {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column()
  type: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => parseInt(value as string, 10),
    },
  })
  size: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  url: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  context: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}