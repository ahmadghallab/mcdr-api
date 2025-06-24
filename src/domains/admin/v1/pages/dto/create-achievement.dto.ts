import {
  IsString,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsInt
} from 'class-validator';
import { Type } from 'class-transformer';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateAchievementDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ValidateNested()
  @Type(() => TranslationDto)
  description: TranslationDto;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
