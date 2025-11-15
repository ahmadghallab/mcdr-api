import { IsString } from "class-validator";
import { PaginationDto } from "src/core/common/dto/pagination.dto";

export class SearchDto extends PaginationDto {
  @IsString()
  q: string;
}