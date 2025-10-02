import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from 'fs/promises';
import { DiskStorageOptions } from "multer";
import * as path from 'path';
import { Repository } from "typeorm";
import { File } from "./entities/file.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/core/common/dto/pagination.dto";
import { ORDER_BY_CREATED_DESC } from "src/core/utils/order.util";

@Injectable()
export class FilesService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<[File[], number]> {
   return await this.filesRepository.findAndCount({
      skip: paginationDto.skip,
      take: paginationDto.take,
      order: ORDER_BY_CREATED_DESC,
    });
  }

  async create(file: Express.Multer.File): Promise<string> {
    const url = this.getAccessUrl(file.filename);
    const name = file.originalname;
    const type = file.mimetype; 
    const size = file.size;

    await this.filesRepository.save({ name, type, size, url });

    return url;
  }

  async rename(name: string, url: string): Promise<File> {
    try {
      const file = await this.filesRepository.findOneByOrFail({ url });
      file.name = name;
      await this.filesRepository.save(file);
  
      return file;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async delete(url: string): Promise<void> {
    try {
      const filePath = this.extractFilePath(url);      
      if (filePath) {
        await this.deleteFileIfExists(filePath);
      } else {
        throw new BadRequestException(`Invalid file URL: ${url}`);
      }
      await this.filesRepository.delete({ url });
    } catch (error) {
      throw error;
    }

  }

  async deleteFileIfExists(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException(`File does not exist: ${filePath}`);
      } else {
        throw error;
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

  static generateStorageOptions(): DiskStorageOptions {
    return {
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
    };
  }

  getAccessUrl(fileName: string): string {
    return `${this.configService.get('baseUrl')}/uploads/${fileName}`;
  }
}