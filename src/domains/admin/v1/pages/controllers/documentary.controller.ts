import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentaryService } from '../services/documentary.service';
import { CreateDocumentaryDto } from '../dto/create-documentary.dto';
import { UpdateDocumentaryDto } from '../dto/update-documentary.dto';

@Controller('documentaries')
export class DocumentaryController {
  constructor(
    private readonly documentaryService: DocumentaryService,
  ) {}

  @Post()
  create(
    @Body() CreateDocumentaryDto: CreateDocumentaryDto
  ) {
    return this.documentaryService.create(CreateDocumentaryDto);
  }

  @Get()
  findAll() {
    return this.documentaryService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.documentaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentaryDto: UpdateDocumentaryDto) {
    return this.documentaryService.update(+id, updateDocumentaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentaryService.remove(+id);
  }
}
