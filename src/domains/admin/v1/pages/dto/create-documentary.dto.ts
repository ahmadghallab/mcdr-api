import { Type } from "class-transformer";
import { IsEnum, IsObject, IsOptional, IsString, IsUrl, Matches, ValidateNested } from "class-validator";
import { TranslationDto } from "src/core/common/dto/translation.dto";
import { PublishStatus } from "src/core/common/enums/publish-status.enum";

export class CreateDocumentaryDto {
  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationDto)
  name: TranslationDto;

  @IsString()
  @Matches(/^\d{1,2}:\d{2}$/, {
    message: 'duration must be in the format MM:SS or HH:MM',
  })
  duration: string;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
