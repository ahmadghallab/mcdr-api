import { IsEnum } from "class-validator";
import { PaginationDto } from "src/core/common/dto/pagination.dto";
import { LocationType } from "src/core/common/enums/location-type.enum";

export class FindAllPlacesDto extends PaginationDto {
  @IsEnum(LocationType)
  type: LocationType;
}