import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateHighlightDto {
  @IsObject()
  @IsNotEmpty()
  title: { en: string; ar: string };

  @IsObject()
  @IsNotEmpty()
  body: { en: string; ar: string };

  @IsEnum(PublishStatus)
  status: PublishStatus;
}
