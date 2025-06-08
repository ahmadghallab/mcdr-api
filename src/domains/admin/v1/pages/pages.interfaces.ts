import { Translation } from "src/core/common/types/translation.type"
import { Page } from "./entities/page.entity"

export interface GroupedPagesBySection {
  section: string
  pages: Page[]
}

export interface NamedLink {
  name: Translation
  url: Translation|string
}