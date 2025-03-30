import { Page } from "./entities/page.entity"

export interface GroupedPagesBySection {
  section: string
  pages: Page[]
}