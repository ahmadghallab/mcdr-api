import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Match } from 'src/core/common/decorators/match.decorator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  @Match('newPassword', { message: 'Passwords do not match' })
  passwordConfirm: string;
}
