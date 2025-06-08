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

export const FILE_SIGNATURES = {
  // PNG
  png: '89504E470D0A1A0A',
  // JPEG
  jpg: 'FFD8FF',
  // PDF
  pdf: '25504446',
  // MP4
  mp4: '00000018667479706D703432',
  // More can be added as needed
};

export type AllowedFileType = keyof typeof FILE_SIGNATURES;

export const ALLOWED_FILE_TYPES: AllowedFileType[] = ['png', 'jpg', 'pdf', 'mp4'];

export const FILE_TYPE_TO_MIME: Record<AllowedFileType, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
};