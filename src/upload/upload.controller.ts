import { Controller, Post, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('upload')
export class UploadController {

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '../..', 'uploads');
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
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    const protocol = req.protocol;
    const host = req.get('host');
    const accessUrl = `${protocol}://${host}/uploads/${file.filename}`;

    return {
      message: 'File uploaded successfully',
      fileName: file.filename,
      accessUrl
    };
  }
}
