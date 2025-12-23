import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { TranslationDto } from 'src/core/common/dto/translation.dto';

class BranchDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  name: TranslationDto;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tel: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fax?: string[];

  @ValidateNested()
  @Type(() => TranslationDto)
  address: TranslationDto;
}

export class CreateContactUsDto {
  @IsEmail()
  email: string;

  @IsString()
  hotline: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchDto)
  branches: BranchDto[];

  @ValidateNested()
  @Type(() => TranslationDto)
  workHours: TranslationDto;
}
