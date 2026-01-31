import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BranchInfo } from "../interfaces/pages.interfaces";
import { Translation } from "src/core/common/types/translation.type";
import { SupportCategory } from "src/core/common/enums/support-category.enum";
import { Searchable } from "src/core/search/searchable.decorator";
import { SearchHrefBuilder } from "src/core/search/search-href.builder";
import { buildContactUsSearchableText } from "../utils/contact-us.search.util";

@Searchable({
  index: 'global',
  type: 'contact_us',
  pick: ['name.en', 'name.ar'],
  extra: (contact: ContactUs) => ({
    href: SearchHrefBuilder.forContactUs(contact.department),
    searchable_text: buildContactUsSearchableText(contact),
  }),
})
@Entity('contact_us')
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json' })
  name: Translation;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  hotline: string;

  @Column('json')
  branches: BranchInfo[];

  @Column({ type: 'json', name: 'work_hours' })
  workHours: Translation;

  @Column({ type: 'enum', enum: SupportCategory, name: 'department' })
  department: SupportCategory;
}
