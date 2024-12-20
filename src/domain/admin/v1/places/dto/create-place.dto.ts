import { Type } from "class-transformer";
import { IsArray, IsEnum, IsObject, IsString, ValidateNested } from "class-validator";
import { Translation } from "src/common/dto/translation.dto";
import { PlaceType } from "../entities/place.entity";

export class CreatePlaceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => Translation)
  address: Translation;

  @IsString()
  iframeSrc: string

  @IsArray()
  phones: string[]

  @IsEnum(PlaceType)
  type: PlaceType
}
