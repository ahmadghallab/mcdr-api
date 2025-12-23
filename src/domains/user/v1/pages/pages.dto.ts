import { IsEnum } from "class-validator";
import { ContactInfoModule, LawPage } from "./page.types";
import { ParticipantType } from "src/domains/admin/v1/pages/enums/participant-type.enum";
import { OpportunityType } from "src/domains/admin/v1/pages/enums/opportunity-type.enum";

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

export class OpportunitiesPageDto {
  @IsEnum(OpportunityType)
  type: OpportunityType;
}

export class ContactUsResponse {
  id: number;
  email: string;
  hotline: string;
  workHours: string;
  branches: {
    name: string;
    address: string;
    tel: string[];
    fax?: string[];
  }[];
}
