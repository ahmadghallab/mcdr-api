import { LegislationType } from "src/domains/admin/v1/pages/enums/legislation-type.enum";
import { SupportCategory } from "../common/enums/support-category.enum";
import { ParticipantType } from "src/domains/admin/v1/pages/enums/participant-type.enum";
import { LocationType } from "../common/enums/location-type.enum";

export class SearchHrefBuilder {
  
  static forFaq(department: SupportCategory) {
    const map: Record<SupportCategory, string> = {
      [SupportCategory.CustomerSupport]: '/customer-support/faqs',
      [SupportCategory.ElectronicSignature]: '/electronic-signature/faqs',
    };
    return map[department];
  }

  static forLegislation(type: LegislationType) {
    const map: Record<LegislationType, string> = {
      [LegislationType.LAWS]: '/laws-regulations/laws',
      [LegislationType.OTHER_LAWS_REGULATING_WORK]: '/laws-regulations/other-laws-regulating-work',
      [LegislationType.RESOLUTION_SETTLEMENT_GUARANTEE_FUND]: '/laws-regulations/resolution-settlement-guarantee-fund',
      [LegislationType.RULES_SETTLEMENT_GUARANTEE_FUND]: '/laws-regulations/rules-settlement-guarantee-fund',
      [LegislationType.IMPORTANT_LINKS]: '/laws-regulations/important-links',
      [LegislationType.RELATED_SITES]: '/customer-support/related-sites',
      [LegislationType.SURVEYS]: '/laws-regulations/surveys',
      [LegislationType.FORMS]: '/laws-regulations/forms',
      [LegislationType.FRA_RESOLUTIONS]: '/laws-regulations/fra-resolutions',
    };
    return map[type];
  }

  static forParticipant(type: ParticipantType) {
    const map: Record<ParticipantType, string> = {
      [ParticipantType.BROKERAGE]: '/members-subscribers/brokerage',
      [ParticipantType.CUSTODIANS]: '/members-subscribers/custodians',
      [ParticipantType.ISSUING_COMPANIES]: '/members-subscribers/issuing-companies',
      [ParticipantType.MOST_ACTIVE]: '/members-subscribers/most-active',
    };
    return map[type];
  }

  static forPage(slug: string) {
    return `/${slug}`;
  }

  static forArticle(id: number) {
    return `/news/${id}`;
  }

  static forDirector() {
    return '/governance/directors';
  }

  static forDocumentary() {
    return '/overview/documentaries';
  }

  static forAnnualReport() {
    return '/data-reports/annual-reports';
  }

  static forSignatureFile() {
    return '/electronic-signature/files';
  }

  static forAchievement() {
    return '/overview/achievements-awards';
  }

  static forPlace(type: LocationType) {
    const map: Record<LocationType, string> = {
      [LocationType.CouponExchange]: '/activities-services/coupon-exchange-locations',
      [LocationType.ESignatureCertificate]: '/electronic-signature/introduction',
    };
    return map[type];
  }

}
