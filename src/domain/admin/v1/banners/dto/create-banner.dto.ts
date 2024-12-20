import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Translation } from "src/common/dto/translation.dto";

export class CreateBannerDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  title: Translation

  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  description: Translation
}
