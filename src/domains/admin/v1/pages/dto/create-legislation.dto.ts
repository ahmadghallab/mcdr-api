import { IsNotEmpty, IsOptional, IsObject, IsInt, IsEnum, IsString } from 'class-validator';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { LegislationType } from '../enums/legislation-type.enum';

export class CreateLegislationDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @IsNotEmpty()
  name: TranslationDto;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(LegislationType)
  type: LegislationType;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
