import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { Translation } from "src/common/dto/translation.dto";

export class CreateArticleDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation) // Enables nested validation
  title: Translation;

  @IsObject()
  @ValidateNested()
  @Type(() => Translation) // Enables nested validation
  body: Translation;
}
