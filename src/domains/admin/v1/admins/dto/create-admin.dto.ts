import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AdminRole } from 'src/core/common/enums/admin-role.enum';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(AdminRole)
  @IsNotEmpty()
  role: AdminRole;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
