import { Translation } from "src/core/common/types/translation.type";

export interface BranchInfo {
  name: Translation; 
  tel: string[];
  fax?: string[];
  address: Translation;
}

export interface ContactUs {
  email: string
  hotline: string
  branches: BranchInfo[];
}