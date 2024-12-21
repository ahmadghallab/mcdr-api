import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Translation } from "src/core/common/dto/translation.dto";

export class CreateArticleDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  title: Translation;

  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  body: Translation;
}
