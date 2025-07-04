import { Achievement } from "src/domains/admin/v1/pages/entities/achievement.entity"
import { Documentary } from "src/domains/admin/v1/pages/entities/documentary.entity"
import { Legislation } from "src/domains/admin/v1/pages/entities/legislation.entity"
import { Opportunity } from "src/domains/admin/v1/pages/entities/opportunity.entity"

export enum ContactInfoModule {
  CustomerSupport = "customer-support",
  ElectronicSignature = "electronic-signature",
}

export enum LawPage {
  ImportantLinks = "important-links",
  Laws = "laws",
  OtherLawsRegulatingWork = "other-laws-regulating-work",
  RulesSettlementGuaranteeFund = "rules-settlement-guarantee-fund",
  ResolutionSettlementGuaranteeFund = "resolution-settlement-guarantee-fund",
}

export interface RelatedSite {
  logo: string
  name: string
  url: string
}

export interface NamedLink {
  name: string
  url: string
}

export interface Page {
  id: string
  title: string
  content: string
}

export interface ElectronicSignatureFile { 
  name: string | null; 
  items: NamedLink[] 
}

export interface UserDirector {
  id: number
  avatarUrl: string
  title: string
  name: string
  position: string
  bio: string
  order: number
}

export type LocalizedDocumentary = Omit<Documentary, 'name'> & {
  name: string;
};

export type LocalizedAchievement = Omit<Achievement, 'description'> & {
  description: string;
};

export type LocalizedOpportunity = Omit<Opportunity, 'titleEn'|'titleAr'|'descriptionEn'|'descriptionAr'> & {
  title: string;
  description: string;
};

export type LocalizedLegislation = Omit<Legislation, 'name'> & {
  name: string;
};