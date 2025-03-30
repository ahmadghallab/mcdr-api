import { Controller, Get,Param, Headers } from '@nestjs/common';
import { PagesService } from './pages.service';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { FaqDepartment } from 'src/core/common/enums/faq-department.enum';

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
  @Get('electronic-signature/faqs')
  findElectronicSignatureFaqs(
    @Headers('accept-language') lang: string
  ) {    
    return this.pagesService.findFaqs(lang, FaqDepartment.ElectronicSignature);
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
