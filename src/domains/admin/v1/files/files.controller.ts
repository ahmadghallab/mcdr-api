import { Controller, Post, UseInterceptors, UploadedFile, Delete, Body, Patch, Get, Query } from '@nestjs/common';
import { FilesService } from './files.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { RenameFileDto } from './dto/rename-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadFileDto } from './dto/upload-file.dto';
import { FindAllFilesDto } from './dto/find-all-files.dto';
import { Public } from '../auth/auth.decorator';

@Controller()
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Get()
  async findAll(@Query() findAllFilesDto: FindAllFilesDto) {
    const [items, total] = await this.filesService.findAll(findAllFilesDto);
    const { page, limit } = findAllFilesDto;

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
      // fileFilter: fileValidator
    }),
    // MagicNumberValidationInterceptor('file')
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {

    const url = await this.filesService.create(file, uploadFileDto);

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
