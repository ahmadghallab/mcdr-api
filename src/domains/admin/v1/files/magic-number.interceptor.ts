import { BadRequestException, Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { unlinkSync } from 'fs';
import { detectFileType } from './utils/magic-number.util';
import { ALLOWED_FILE_TYPES, FILE_TYPE_TO_MIME } from './utils/file-validator.util';
import * as path from 'path';

export function MagicNumberValidationInterceptor(fieldName: string) {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor() {
      this.fileInterceptor = new (FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const uploadPath = path.join(process.cwd(), 'uploads');
            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
            cb(null, fileName);
          },
        }),
      }))();
    }

    async intercept(context: any, next: any) {
      await this.fileInterceptor.intercept(context, next);

      const request = context.switchToHttp().getRequest();
      const file = request.file;

      if (!file) {
        return next.handle();
      }

      try {
        const detectedType = detectFileType(file.path);
        
        if (!detectedType || !ALLOWED_FILE_TYPES.includes(detectedType)) {
          unlinkSync(file.path);
          throw new BadRequestException(
            `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`
          );
        }

        // Update the file object with the detected MIME type
        file.mimetype = FILE_TYPE_TO_MIME[detectedType];
        request.file = file;

        return next.handle();
      } catch (error) {
        if (file?.path) {
          try { unlinkSync(file.path); } catch {}
        }
        throw error;
      }
    }
  }

  return mixin(MixinInterceptor);
}