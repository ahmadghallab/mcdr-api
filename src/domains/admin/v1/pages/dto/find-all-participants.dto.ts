import { IsEnum } from "class-validator";
import { ParticipantType } from "../enums/participant-type.enum";
import { PaginationDto } from "src/core/common/dto/pagination.dto";

export class FindAllParticipantsDto extends PaginationDto {
  @IsEnum(ParticipantType)
  type: ParticipantType;
}