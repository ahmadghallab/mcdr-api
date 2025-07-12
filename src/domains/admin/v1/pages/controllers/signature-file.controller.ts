import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignatureFileService } from '../services/signature-file.service';
import { CreateSignatureFileDto } from '../dto/create-signature-file.dto';
import { UpdateSignatureFileDto } from '../dto/update-signature-file.dto';

@Controller('signature-files')
export class SignatureFileController {
  constructor(
    private readonly signatureFileService: SignatureFileService,
  ) {}

  @Post()
  create(
    @Body() CreateSignatureFileDto: CreateSignatureFileDto
  ) {
    return this.signatureFileService.create(CreateSignatureFileDto);
  }

  @Get()
  findAll() {
    return this.signatureFileService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.signatureFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignatureFileDto: UpdateSignatureFileDto) {
    return this.signatureFileService.update(+id, updateSignatureFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signatureFileService.remove(+id);
  }
}
