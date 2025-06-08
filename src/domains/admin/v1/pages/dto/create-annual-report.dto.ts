import { IsNotEmpty, IsOptional, IsObject, IsInt, IsEnum } from 'class-validator';
import { TranslationDto } from 'src/core/common/dto/translation.dto';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateAnnualReportDto {
  @IsObject()
  @IsNotEmpty()
  url: TranslationDto;

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
