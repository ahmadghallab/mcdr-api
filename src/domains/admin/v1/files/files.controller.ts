import { Controller, Post, UseInterceptors, UploadedFile, Delete, Body, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesService } from './files.service';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller()
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = file.originalname.split('.').pop();
          const fileName = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File
  ) {
    const accessUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;

    return {
      message: 'File uploaded successfully',
      fileName: file.filename,
      accessUrl
    };
  }

  @Delete('delete')
  async deleteFile(@Body() deleteFileDto: DeleteFileDto) {
    try {
      await this.filesService.deleteFile(deleteFileDto.fileUrl);
    } catch(error) {
      throw new InternalServerErrorException({
        message: 'File deletion failed.',
        error: error.message,
        code: 500,
      });
    }
    return {
      message: 'File deleted successfully',
      fileUrl: deleteFileDto.fileUrl
    };
  }
}
