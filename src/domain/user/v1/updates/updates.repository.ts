import { AssemblyDates, Dividend, IPO, IPOStatusEnum, MeetingStatusEnum } from "./updates.interface";

export const dividends: Dividend[] = [
  {
    id: 1,
    name: {
      en: "Al-Maidan Clinic and Dental Services Company",
      ar: "شركة عيادة الميدان وخدمات طب الأسنان",
    },
    startDate: "2023-04-24 13:54:45",
    cash: 12,
    shares: 25,
    image: "/images/placeholder.svg"
  },
  {
    id: 2,
    name: {
      en: "Al-Maidan Clinic and Dental Services Company II",
      ar: "II شركة عيادة الميدان وخدمات طب الأسنان",
    },
    startDate: "2023-04-24 13:54:45",
    cash: 55,
    shares: 65,
    image: "/images/placeholder.svg"
  }
]

export const assemblyDates: AssemblyDates[] = [
  {
    id: 1,
    assemblyTime: "2023-04-24 13:54:45",
    votingStatus: MeetingStatusEnum.OPEN,
    company: {
      en: "Al Jazeera Services",
      ar: "الجزيرة للخدمات",
    },
    associationType: {
      en: "For the Extraordinary General Assembly",
      ar: "لجمعية العامة غير العادية",
    },
    location: {
      en: "Via the electronic platform",
      ar: "عبر المنصة الإلكترونية",
    },
  },
  {
    id: 2,
    assemblyTime: "2023-04-24 13:54:45",
    votingStatus: MeetingStatusEnum.NOT_STARTED,
    company: {
      en: "Salalah Mills",
      ar: "الجزيرة للخدمات",
    },
    associationType: {
      en: "For the Extraordinary General Assembly",
      ar: "لجمعية العامة غير العادية",
    },
    location: {
      en: "Via the electronic platform",
      ar: "عبر المنصة الإلكترونية",
    },
  },
  {
    id: 3,
    assemblyTime: "2023-04-24 13:54:45",
    votingStatus: MeetingStatusEnum.NOT_STARTED,
    company: {
      en: "Salalah Mills II",
      ar: "II الجزيرة للخدمات",
    },
    associationType: {
      en: "For the Extraordinary General Assembly",
      ar: "لجمعية العامة غير العادية",
    },
    location: {
      en: "Via the electronic platform",
      ar: "عبر المنصة الإلكترونية",
    },
  },
]

export const meetingStatusLabels = {
  en: {
    not_started: "Not Started Yet",
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
    canceled: "Canceled",
    postponed: "Postponed",
  },
  ar: {
    not_started: "لم يبدأ بعد",
    open: "مفتوح",
    in_progress: "قيد التنفيذ",
    completed: "اكتمل",
    canceled: "ملغاة",
    postponed: "مؤجلة",
  },
};

export const recentIPO: IPO = {
  id: 1,
  status: IPOStatusEnum.ACTIVE,
  updatedAt: "2023-04-24 13:54:45",
  shares: 1700000,
  name: {
    en: "ACT Financial IPO",
    ar: 'اكتتاب "أكت فاينانشال"',
  },
  description: {
    en: "The subscription prospectus stated that the percentage offered by the company is 32%, indicating that the offering price is 2.9 pounds per share, and that the fair value is about 4.54 pounds per share, with the aim of reaching a proceeds estimated at about 1.040 billion pounds.",
    ar: "وأوضحت نشرة الاكتتاب أن النسبة المطروحة من الشركة تبلغ 32%، مبينة أن سعر الطرح يبلغ 2.9 جنيه للسهم، وأن القيمة العادلة تبلغ نحو 4.54 جنيه للسهم، بهدف الوصول لحصيلة تقدر بنحو 1.040 مليار جنيه."
  },
  image: "/images/placeholder.svg"
}

export const ipoStatusLabels = {
  en: {
    active: "Active",
    inactive: "Inactive",
  },
  ar: {
    active: "فعال",
    inactive: "غير فعال",
  },
};