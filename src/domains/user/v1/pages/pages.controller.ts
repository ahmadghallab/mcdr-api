import { Controller, Get,Param, Headers, Header, ParseIntPipe } from '@nestjs/common';
import { PagesService } from './pages.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';
import { ContactInfoDto, LawPageDto } from './pages.dto';

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
  @Get('laws-regulations/:pageName')
  findLawsPage(
    @Param() params: LawPageDto,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findLawsPage(lang, params.pageName);
  }

  @Public()
  @Get('members-subscribers/forms')
  findMembersForms(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findMembersForms(lang);
  }

  @Public()
  @Get('overview/achievements-awards')
  findAwards(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findAwards(lang);
  }

  @Public()
  @Get('overview/documentaries')
  findDocumentaries(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findDocumentaries(lang);
  }

  @Public()
  @Get('overview/documentaries/:id')
  findDocumentary(
    @Param('id', ParseIntPipe) id: number,
    @Headers('accept-language') lang: string
  ) {
    return this.pagesService.findDocumentary(lang, id);
  }

  @Public()
  @Get('/*')
  findOne(
    @Param('0') slug: string,
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findOne(slug, lang);
  }
}
