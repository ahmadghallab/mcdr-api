import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsUrl, ValidateNested } from "class-validator";
import { Translation } from "src/common/dto/translation.dto";

export class CreateSolutionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation) // Enables nested validation
  title: Translation;

  @IsObject()
  @ValidateNested()
  @Type(() => Translation) // Enables nested validation
  body: Translation;

  @IsNotEmpty()
  fileUrl: string
}
