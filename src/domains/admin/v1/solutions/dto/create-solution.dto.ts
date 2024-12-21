import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { Translation } from "src/core/common/dto/translation.dto";

export class CreateSolutionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  title: Translation;

  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  body: Translation;

  @IsNotEmpty()
  fileUrl: string
}
