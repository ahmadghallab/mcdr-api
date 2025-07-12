import { PartialType } from '@nestjs/mapped-types';
import { CreateSignatureFileDto } from './create-signature-file.dto';

export class UpdateSignatureFileDto extends PartialType(CreateSignatureFileDto) {}
