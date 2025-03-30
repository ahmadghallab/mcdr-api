import { IsEnum } from "class-validator";
import { FaqDepartment } from "src/core/common/enums/faq-department.enum";

export class ListFaqsDto {
  @IsEnum(FaqDepartment)
  department: FaqDepartment;
}