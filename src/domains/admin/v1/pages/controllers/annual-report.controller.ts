import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnualReportService } from '../services/annual-report.service';
import { CreateAnnualReportDto } from '../dto/create-annual-report.dto';
import { UpdateAnnualReportDto } from '../dto/update-annual-report.dto';

@Controller('data-reports')
export class AnnualReportController {
  constructor(
    private readonly annualReportService: AnnualReportService,
  ) {}

  @Post('annual-reports')
  create(
    @Body() CreateAnnualReportDto: CreateAnnualReportDto
  ) {
    return this.annualReportService.create(CreateAnnualReportDto);
  }

  @Get('annual-reports')
  findAll() {
    return this.annualReportService.findAll();
  }

  @Get('annual-reports/:id')
  findOne(
    @Param('id') id: string
  ) {
    return this.annualReportService.findOne(+id);
  }

  @Patch('annual-reports/:id')
  update(@Param('id') id: string, @Body() updateAnnualReportDto: UpdateAnnualReportDto) {
    return this.annualReportService.update(+id, updateAnnualReportDto);
  }

  @Delete('annual-reports/:id')
  remove(@Param('id') id: string) {
    return this.annualReportService.remove(+id);
  }
}
