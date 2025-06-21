import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentaryDto } from '../dto/create-documentary.dto';
import { UpdateDocumentaryDto } from '../dto/update-documentary.dto';
import { Documentary } from '../entities/documentary.entity';

@Injectable()
export class DocumentaryService {

  constructor(
    @InjectRepository(Documentary)
    private readonly documentaryRepository: Repository<Documentary>,
  ) {}

  
  async findAll(): Promise<Documentary[]> {
    const documentaries = await this.documentaryRepository.find();
    return documentaries;
  }

  async findOne(id: number): Promise<Documentary> {
    const documentary = await this.documentaryRepository.findOneByOrFail({ id });
    return documentary;
  }

  async create(createDocumentaryDto: CreateDocumentaryDto): Promise<Documentary> {
    return this.documentaryRepository.save(createDocumentaryDto);
  }

  async update(id: number, updateDocumentaryDto: UpdateDocumentaryDto): Promise<Documentary> {
    const documentary = await this.documentaryRepository.findOneByOrFail({ id });
    return this.documentaryRepository.save({...documentary, ...updateDocumentaryDto});
  }

  async remove(id: number): Promise<void> {
    await this.documentaryRepository.delete(id);
  }
}
