import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { SupportCategory } from 'src/core/common/enums/support-category.enum';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateFaqDto {
  @IsEnum(SupportCategory)
  @IsNotEmpty()
  department: SupportCategory;

  @IsString()
  @IsNotEmpty()
  qEn: string;

  @IsString()
  @IsNotEmpty()
  qAr: string;

  @IsString()
  @IsNotEmpty()
  aEn: string;

  @IsString()
  @IsNotEmpty()
  aAr: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsEnum(PublishStatus)
  @IsNotEmpty()
  status: PublishStatus;
}
