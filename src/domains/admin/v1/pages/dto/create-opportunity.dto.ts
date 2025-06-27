import { IsEnum, IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';
import { OpportunityType } from '../enums/opportunity-type.enum';
import { PublishStatus } from 'src/core/common/enums/publish-status.enum';

export class CreateOpportunityDto {
  @IsEnum(OpportunityType)
  type: OpportunityType;

  @IsString()
  @MaxLength(255)
  titleEn: string;

  @IsString()
  @MaxLength(255)
  titleAr: string;

  @IsString()
  descriptionEn: string;

  @IsString()
  descriptionAr: string;

  @IsEnum(PublishStatus)
  status: PublishStatus;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
