import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FilesService {

  constructor(private readonly configService: ConfigService) {}

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const filePath = this.extractFilePath(fileUrl);      
      if (filePath) {
        await this.deleteFileIfExists(filePath);
      } else {
        throw new Error(`Invalid file URL: ${fileUrl}`);
      }
    } catch (error) {
      throw new Error(error);
    }

  }

  async deleteFileIfExists(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File does not exist: ${filePath}`);
      } else {
        throw new Error(error);
      }
    }
  }

  private extractFilePath(fileUrl: string): string | null {

    const baseUrl = this.configService.get('baseUrl')

    if (!fileUrl.startsWith(baseUrl)) {
      return null;
    }

    const relativePath = fileUrl.substring(baseUrl.length);
    if (!relativePath) {
      return null;
    }

    const uploadsDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadsDir, path.basename(relativePath));

    return filePath;

  }
}