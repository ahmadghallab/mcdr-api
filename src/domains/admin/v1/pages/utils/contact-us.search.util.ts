import { createSearchBuilder } from "src/core/search/search.util";
import { ContactUs } from "../entities/contact.entity";

export function buildContactUsSearchableText(contact: ContactUs): string {
  const { add, build } = createSearchBuilder();

  add(`contact تواصل ${contact.name.en} ${contact.name.ar}`);
  add(`email mail بريد ايميل ${contact.email}`);
  add(`phone hotline هاتف رقم خط ساخن ${contact.hotline}`);
  add(`working hours ساعات العمل مواعيد العمل ${contact.workHours.en} ${contact.workHours.ar}`);

  for (const branch of contact.branches) {
    add(`branch فرع ${branch.name.en} ${branch.name.ar}`);
    add(`address location عنوان ${branch.address.en} ${branch.address.ar}`);
    add(`phone هاتف ${branch.tel.join(' ')}`);

    if (branch.fax?.length) {
      add(`fax فاكس ${branch.fax.join(' ')}`);
    }
  }

  return build();
}


