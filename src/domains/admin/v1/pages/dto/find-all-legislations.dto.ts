import { IsEnum } from "class-validator";
import { LegislationType } from "../enums/legislation-type.enum";

export class FindAllLegislationsDto {
  @IsEnum(LegislationType)
  type: LegislationType;
}