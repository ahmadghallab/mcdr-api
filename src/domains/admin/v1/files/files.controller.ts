import { Controller, Post, UseInterceptors, UploadedFile, Delete, Body, Patch, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { fileValidator } from './utils/file-validator.util';

@Controller()
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const [items, total] = await this.filesService.findAll(paginationDto);
    const { page, limit } = paginationDto;

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(FilesService.generateStorageOptions()),
      fileFilter: fileValidator
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File
  ) {

    const url = await this.filesService.create(file);

    return {
      message: 'File uploaded successfully',
      fileName: file.originalname,
      accessUrl: url
    };
  }

  @Patch('rename')
  async rename(@Body() renameFileDto: RenameFileDto) {
    const { name, url } = renameFileDto;

    const file = await this.filesService.rename(name, url);

    return {
      message: 'File renamed successfully',
      data: file
    };
  }

  @Delete('delete')
  async delete(@Body() deleteFileDto: DeleteFileDto) {
    try {
      await this.filesService.delete(deleteFileDto.url);
    } catch(error) {
      throw error;
    }
    return {
      message: 'File deleted successfully',
      fileUrl: deleteFileDto.url
    };
  }
}
