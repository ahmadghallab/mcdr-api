import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('files')
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

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}