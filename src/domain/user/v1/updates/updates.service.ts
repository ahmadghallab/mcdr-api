import { Injectable } from '@nestjs/common';
import { IPOStatusEnum, MeetingStatusEnum } from './updates.interface';
import { assemblyDates, dividends, ipoStatusLabels, meetingStatusLabels, recentIPO } from './updates.repository';

@Injectable()
export class UpdatesService {

  getRecentMeetings(lang: string) {
    const responseData = assemblyDates.map((item) => ({
      id: item.id,
      assemblyTime: item.assemblyTime,
      votingStatus: {
        value: item.votingStatus,
        label: this.getMeetingStatusLabel(lang, item.votingStatus)
      },
      company: item.company[lang],
      associationType: item.associationType[lang],
      location: item.location[lang],
    }));

    return responseData;
  }

  getRecentDividends(lang: string) {
    const responseData = dividends.map((item) => ({
      ...item,
      name: item.name[lang],
    }));

    return responseData;
  }

  getRecentIPOs(lang: string) {
    const responseData = {
      id: recentIPO.id,
      updatedAt: recentIPO.updatedAt,
      shares: recentIPO.shares,
      image: recentIPO.image,
      name: recentIPO.name[lang],
      description: recentIPO.description[lang],
      status: {
        value: recentIPO.status,
        label: this.getIPOStatusLabel(lang, recentIPO.status)
      },
    };

    return responseData;
  }

  getMeetingStatusLabel(lang: string, status: MeetingStatusEnum) {
    return meetingStatusLabels[lang]?.[status] || "Unknown Status";
  }

  getIPOStatusLabel(lang: string, status: IPOStatusEnum) {
    return ipoStatusLabels[lang]?.[status] || "Unknown Status";
  }
}
