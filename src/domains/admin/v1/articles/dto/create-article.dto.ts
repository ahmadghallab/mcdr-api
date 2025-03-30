import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @IsString()
  @IsNotEmpty()
  titleAr: string;

  @IsString()
  @IsNotEmpty()
  bodyEn: string;

  @IsString()
  @IsNotEmpty()
  bodyAr: string;

  @IsString()
  @IsOptional()
  contentEn?: string;

  @IsString()
  @IsOptional()
  contentAr?: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;
}
