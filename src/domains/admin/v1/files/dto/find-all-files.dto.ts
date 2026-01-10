import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/core/common/dto/pagination.dto";

export class FindAllFilesDto extends PaginationDto {
  @IsString()
  @IsOptional()
  context?: string;
}