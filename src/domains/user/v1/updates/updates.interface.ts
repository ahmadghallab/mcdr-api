import { TranslationDto } from "src/core/common/dto/translation.dto"

export enum MeetingStatusEnum {
  NOT_STARTED = 'not_started',
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  POSTPONED = 'postponed'
}

export interface Dividend {
  id: number
  startDate: string
  name: TranslationDto
  cash: number
  shares: number
  image: string,
}

export interface AssemblyDates {
  id: number,
  assemblyTime: string
  votingStatus: MeetingStatusEnum
  company: TranslationDto
  associationType: TranslationDto
  location: TranslationDto
}

export enum IPOStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface IPO {
  id: number
  updatedAt: string
  status: IPOStatusEnum
  name: TranslationDto
  description: TranslationDto
  shares: number
  image: string,
}