import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

class HrefDto {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}

export class CreateBannerDto {
  @IsObject()
  @IsNotEmpty()
  title: TranslationDto;

  @IsObject()
  @IsNotEmpty()
  description: TranslationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HrefDto)
  href?: HrefDto;

  @IsBoolean()
  @IsOptional()
  isExternal?: boolean;

  @IsEnum(PublishStatus)
  status: PublishStatus;
}
