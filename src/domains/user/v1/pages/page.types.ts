import { Documentary } from "src/domains/admin/v1/pages/entities/documentary.entity"

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

export interface DocumentaryVideo {
  id: number
  name: string
  url: string
  duration: string
}

export interface Award {
  id: number
  imageUrl?: string
  date?: string
  description: string
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
