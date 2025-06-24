import { Controller, Get,Param, Headers, ParseIntPipe, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { ContactInfoDto, ParticipantsPageDto } from './pages.dto';
import { PaginationDto } from 'src/core/common/dto/pagination.dto';
import { FindAllLegislationsDto } from 'src/domains/admin/v1/pages/dto/find-all-legislations.dto';

@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Public()
  @Get('customer-support/faqs')
  findCustomerSupportFaqs(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findFaqs(lang, FaqDepartment.CustomerSupport);
  }

  @Public()
  @Get(':module/contact-us')
  findContactInfo(
    @Param() params: ContactInfoDto,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findContactInfo(lang);
  }

  @Public()
  @Get('electronic-signature/faqs')
  findElectronicSignatureFaqs(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findFaqs(lang, FaqDepartment.ElectronicSignature);
  }

  @Public()
  @Get('customer-support/related-sites')
  findRelatedSites(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findRelatedSites(lang);
  }

  @Public()
  @Get('data-reports/annual-reports')
  findAnnualReports(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findAnnualReports(lang);
  }

  @Public()
  @Get('data-reports/participate-in-global-surveys')
  findSurveys(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findSurveys(lang);
  }

  @Public()
  @Get('electronic-signature/files')
  findElectronicSignatureFiles(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findElectronicSignatureFiles(lang);
  }

  @Public()
  @Get('governance/directors')
  findDirectors(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findDirectors(lang);
  }

  @Public()
  @Get('laws-regulations/:type')
  findLegislations(
    @Param() params: FindAllLegislationsDto,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findLegislations(lang, params.type);
  }

  @Public()
  @Get('overview/achievements-awards')
  findAchievements(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findAchievements(lang);
  }

  @Public()
  @Get('overview/documentaries')
  findDocumentaries(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findDocumentaries(lang);
  }

  @Public()
  @Get('members-subscribers/:type')
  async findParticipants(
    @Query() paginationDto: PaginationDto,
    @Headers('accept-language') lang: string,
    @Param() params: ParticipantsPageDto,
  ) {
    const [items, total] = await this.pagesService.findParticipants(lang, params.type, paginationDto);
    const { page, limit } = paginationDto;

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Public()
  @Get('members-subscribers/:id/details')
  findParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findParticipant(lang, id);
  }

  @Public()
  @Get('/*')
  findPage(
    @Param('0') slug: string,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findPage(slug, lang);
  }
}
