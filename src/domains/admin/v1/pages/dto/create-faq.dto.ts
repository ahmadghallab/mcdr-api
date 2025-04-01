import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateFaqDto {
  @IsEnum(FaqDepartment)
  @IsNotEmpty()
  department: FaqDepartment;

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
