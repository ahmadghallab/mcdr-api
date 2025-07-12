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
    const documentaries = await this.signatureFileRepository.find();
    return documentaries;
  }

  async findOne(id: number): Promise<SignatureFile> {
    const documentary = await this.signatureFileRepository.findOneByOrFail({ id });
    return documentary;
  }

  async create(createSignatureFileDto: CreateSignatureFileDto): Promise<SignatureFile> {
    return this.signatureFileRepository.save(createSignatureFileDto);
  }

  async update(id: number, updateSignatureFileDto: UpdateSignatureFileDto): Promise<SignatureFile> {
    const documentary = await this.signatureFileRepository.findOneByOrFail({ id });
    return this.signatureFileRepository.save({...documentary, ...updateSignatureFileDto});
  }

  async remove(id: number): Promise<void> {
    await this.signatureFileRepository.delete(id);
  }
}
