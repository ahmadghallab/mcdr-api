import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  @IsNotEmpty()
  titleAr: string;

  @IsString()
  @IsNotEmpty()
  contentEn: string;

  @IsString()
  @IsNotEmpty()
  contentAr: string;

  @IsEnum(PublishStatus)
  @IsNotEmpty()
  status: PublishStatus;
}
