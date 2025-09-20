import { IsEnum, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import { PublishStatus } from "src/core/common/enums/publish-status.enum";
import { SignatureType } from "../enums/signature-type";
import { TranslationDto } from "src/core/common/dto/translation.dto";

export class CreateSignatureFileDto {
  @IsObject()
  @IsNotEmpty()
  url: TranslationDto;

  @IsObject()
  @IsNotEmpty()
  name: TranslationDto;

  @IsEnum(SignatureType)
  @IsOptional()
  type?: SignatureType;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
