import { IsNotEmpty, IsOptional, IsString, IsObject, IsInt } from 'class-validator';
import { TranslationDto } from 'src/core/common/dto/translation.dto';

export class CreateDirectorDto {
  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsObject()
  @IsNotEmpty()
  title: TranslationDto;

  @IsObject()
  @IsNotEmpty()
  name: TranslationDto;

  @IsObject()
  @IsNotEmpty()
  position: TranslationDto;

  @IsObject()
  @IsOptional()
  bio?: TranslationDto;

  @IsInt()
  @IsOptional()
  order?: number;
}
