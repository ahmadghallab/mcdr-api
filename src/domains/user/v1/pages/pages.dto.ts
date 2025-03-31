import { IsEnum } from "class-validator";
import { ContactInfoModule, LawPage } from "./page.types";

export class ContactInfoDto {
  @IsEnum(ContactInfoModule)
  module: ContactInfoModule;
}

export class LawPageDto {
  @IsEnum(LawPage)
  pageName: LawPage;
}