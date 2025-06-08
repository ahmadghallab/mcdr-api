import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReport } from '../entities/annual-report.entity';
import { CreateAnnualReportDto } from '../dto/create-annual-report.dto';
import { UpdateAnnualReportDto } from '../dto/update-annual-report.dto';

@Injectable()
export class AnnualReportService {

  constructor(
    @InjectRepository(AnnualReport)
    private readonly annualReportRepository: Repository<AnnualReport>,
  ) {}

  
  async findAll(): Promise<AnnualReport[]> {
    const annualReports = await this.annualReportRepository.find();
    return annualReports;
  }

  async findOne(id: number): Promise<AnnualReport> {
    const annualReport = await this.annualReportRepository.findOneByOrFail({ id });
    return annualReport;
  }

  async create(createAnnualReportDto: CreateAnnualReportDto): Promise<AnnualReport> {
    return this.annualReportRepository.save(createAnnualReportDto);
  }

  async update(id: number, updateAnnualReportDto: UpdateAnnualReportDto): Promise<AnnualReport> {
    const annualReport = await this.annualReportRepository.findOneByOrFail({ id });
    return this.annualReportRepository.save({...annualReport, ...updateAnnualReportDto});
  }

  async remove(id: number): Promise<void> {
    await this.annualReportRepository.delete(id);
  }
}
