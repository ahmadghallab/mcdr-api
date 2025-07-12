import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { AdminRole } from 'src/core/common/enums/admin-role.enum';
import { Exclude } from 'class-transformer';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, name: 'email' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, name: 'password' })
  password: string;

  @Column({ type: 'enum', enum: AdminRole, default: AdminRole.Viewer, name: 'role' })
  role: AdminRole;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
