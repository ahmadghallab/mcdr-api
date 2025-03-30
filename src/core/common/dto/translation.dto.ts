import { IsNotEmpty, IsString } from "class-validator";

export class TranslationDto {
  @IsString()
  @IsNotEmpty({ message: 'English translation is required' })
  en: string;

  @IsString()
  @IsNotEmpty({ message: 'Arabic translation is required' })
  ar: string;
}