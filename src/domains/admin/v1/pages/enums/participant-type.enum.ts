export enum ParticipantType {
  BROKERAGE = 'brokerage',
  CUSTODIANS = 'custodians',
  ISSUING_COMPANIES = 'issuing-companies',
  MOST_ACTIVE = 'most-active',
}

export const participantTypeLabels: Record<ParticipantType, { en: string; ar: string }> = {
  [ParticipantType.BROKERAGE]: { en: 'Brokerage', ar: 'وساطة' },
  [ParticipantType.CUSTODIANS]: { en: 'Custodian', ar: 'أمين حفظ' },
  [ParticipantType.ISSUING_COMPANIES]: { en: 'Issuing Company', ar: 'شركة مصدرة' },
  [ParticipantType.MOST_ACTIVE]: { en: 'Most Active', ar: 'الأكثر نشاطاً' },
};