import { BadRequestException } from '@nestjs/common';

export const allowedMimeTypes = [
  'image/png', 
  'image/jpeg', 
  'video/mp4',
  'application/pdf'
];

export const fileValidator = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Unsupported file type'), false);
  }
};