import { IsEnum, IsOptional, IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { ParticipantType } from '../enums/participant-type.enum';

class BoardMemberDto {
  @IsString()
  serl: string;

  @IsString()
  aname: string;

  @IsString()
  ename: string;
}

export class CreateParticipantDto {
  @IsString()
  code: string;

  @IsEnum(ParticipantType)
  type: ParticipantType;

  @IsString()
  aname: string;

  @IsString()
  ename: string;

  @IsString()
  aaddress: string;

  @IsOptional()
  @IsString()
  eaddress?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  hotline?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoardMemberDto)
  board?: BoardMemberDto[];

  @IsOptional()
  @IsEnum(PublishStatus)
  status?: PublishStatus;
}
