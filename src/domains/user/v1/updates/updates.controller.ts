import { Controller, Get, Headers } from '@nestjs/common';
import { Public } from 'src/domains/admin/v1/auth/auth.decorator';
import { UpdatesService } from './updates.service';

@Controller()
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Public()
  @Get('recent-meetings')
  getRecentMeetings(
    @Headers('accept-language') lang: string
  ) {
    return this.updatesService.getRecentMeetings(lang);
  }

  @Public()
  @Get('recent-dividends')
  getRecentDividends(
    @Headers('accept-language') lang: string
  ) {
    return this.updatesService.getRecentDividends(lang);
  }

  @Public()
  @Get('recent-ipos')
  getRecentIPOs(
    @Headers('accept-language') lang: string
  ) {
    return this.updatesService.getRecentIPOs(lang);
  }

}
