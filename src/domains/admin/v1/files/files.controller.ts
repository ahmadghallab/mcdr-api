import { Controller, Post, UseInterceptors, UploadedFile, Delete, Body, InternalServerErrorException, Patch, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';

@Controller()
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll() {
    return this.filesService.findAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage(FilesService.generateStorageOptions()),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File
  ) {
    const name = file.filename;
    const url = this.filesService.getAccessUrl(name);

    await this.filesService.create(name, url);

    return {
      message: 'File uploaded successfully',
      fileName: name,
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
