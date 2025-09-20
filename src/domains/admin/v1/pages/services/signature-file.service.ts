import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignatureFile } from '../entities/signature-file.entity';
import { CreateSignatureFileDto } from '../dto/create-signature-file.dto';
import { UpdateSignatureFileDto } from '../dto/update-signature-file.dto';

@Injectable()
export class SignatureFileService {

  constructor(
    @InjectRepository(SignatureFile)
    private readonly signatureFileRepository: Repository<SignatureFile>,
  ) {}

  
  async findAll(): Promise<SignatureFile[]> {
    const files = await this.signatureFileRepository.find();
    return files;
  }

  async findOne(id: number): Promise<SignatureFile> {
    const file = await this.signatureFileRepository.findOneByOrFail({ id });
    return file;
  }

  async create(createSignatureFileDto: CreateSignatureFileDto): Promise<SignatureFile> {
    return this.signatureFileRepository.save(createSignatureFileDto);
  }

  async update(id: number, updateSignatureFileDto: UpdateSignatureFileDto): Promise<SignatureFile> {
    const file = await this.signatureFileRepository.findOneByOrFail({ id });
    return this.signatureFileRepository.save({...file, ...updateSignatureFileDto});
  }

  async remove(id: number): Promise<void> {
    await this.signatureFileRepository.delete(id);
  }
}
