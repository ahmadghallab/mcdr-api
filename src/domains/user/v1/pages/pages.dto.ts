import { IsEnum } from "class-validator";
import { ContactInfoModule, LawPage } from "./page.types";
import { ParticipantType } from "src/domains/admin/v1/pages/enums/participant-type.enum";

export class ContactInfoDto {
  @IsEnum(ContactInfoModule)
  module: ContactInfoModule;
}

export class LawPageDto {
  @IsEnum(LawPage)
  pageName: LawPage;
}

export class ParticipantsPageDto {
  @IsEnum(ParticipantType)
  type: ParticipantType;
}