import { IsEnum } from "class-validator";
import { SupportCategory } from "src/core/common/enums/support-category.enum";

export class ListFaqsDto {
  @IsEnum(SupportCategory)
  department: SupportCategory;
}