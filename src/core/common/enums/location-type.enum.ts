export enum LocationType {
  CouponExchange = "COUPON_EXCHANGE",
  ESignatureCertificate = "E_SIGNATURE_CERTIFICATE",
}

export const locationTypeLabels: Record<LocationType, { en: string; ar: string }> = {
  [LocationType.CouponExchange]: { en: 'Coupon Exchange', ar: 'صرف كوبونات' },
  [LocationType.ESignatureCertificate]: { en: 'Electronic Signature Certificate', ar: 'شهادات التوقيع الالكتروني' }
};