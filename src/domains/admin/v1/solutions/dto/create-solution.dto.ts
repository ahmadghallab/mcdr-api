import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';
import { TranslationDto } from 'src/core/common/dto/translation.dto';

export class CreateSolutionDto {
  @IsObject()
  @IsNotEmpty()
  title: TranslationDto;

  @IsObject()
  @IsNotEmpty()
  body: TranslationDto;

  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @IsString()
  @IsNotEmpty()
  href: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;
}
