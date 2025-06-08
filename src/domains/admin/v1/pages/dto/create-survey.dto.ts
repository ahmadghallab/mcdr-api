import { IsNotEmpty, IsOptional, IsObject, IsInt, IsEnum, IsString } from 'class-validator';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @IsNotEmpty()
  name: TranslationDto;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
