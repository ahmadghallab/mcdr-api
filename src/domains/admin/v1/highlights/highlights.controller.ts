import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { UpdateHighlightDto } from './dto/update-highlight.dto';
import { Admin } from '../admins/entities/admin.entity';
import { AuthAdmin } from '../auth/auth-admin.decorator';

@Controller()
export class HighlightsController {
  constructor(private readonly highlightsService: HighlightsService) {}

  @Post()
  create(
    @AuthAdmin() user: Admin,
    @Body() createHighlightDto: CreateHighlightDto
  ) {
    return this.highlightsService.create(createHighlightDto, user);
  }

  @Get()
  findAll() {
    return this.highlightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.highlightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHighlightDto: UpdateHighlightDto) {
    return this.highlightsService.update(+id, updateHighlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.highlightsService.remove(+id);
  }
}
