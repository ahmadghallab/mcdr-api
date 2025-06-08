import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnualReportDto } from './create-annual-report.dto';

export class UpdateAnnualReportDto extends PartialType(CreateAnnualReportDto) {}
