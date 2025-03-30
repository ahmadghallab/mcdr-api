import { TranslationDto } from "../dto/translation.dto";

export const localizeContent = <T extends Record<string, any>>(
  obj: T,
  language: string,
  fields: string[]
) => {
  return fields.reduce((acc, field) => {
    acc[field] = language === "ar" ? obj[`${field}Ar`] : obj[`${field}En`];
    return acc;
  }, {} as Record<string, any>);
};

export const localizedValue = (
  values: TranslationDto,
  language: string,
): string => {
  return values[language] || values['en'];
};