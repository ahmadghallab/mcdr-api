import { IsEnum, IsOptional, IsString } from "class-validator";
import { PublishStatus } from "src/core/common/enums/publish-status.enum";
import { SignatureType } from "../enums/signature-type";

export class CreateSignatureFileDto {
  @IsString()
  url: string;

  @IsString()
  name: string;

  @IsEnum(SignatureType)
  @IsOptional()
  type?: SignatureType;

  @IsEnum(PublishStatus)
  @IsOptional()
  status?: PublishStatus;
}
