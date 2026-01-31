import { ContactUs } from "../entities/contact.entity";

export function buildContactUsSearchableText(contact: ContactUs): string {
  const parts: string[] = [];

  parts.push(
    `contact ${contact.name.en} ${contact.name.ar}`
  );

  parts.push(
    `email contact mail ${contact.email}`
  );

  parts.push(
    `hotline phone call number ${contact.hotline}`
  );

  parts.push(
    `working hours schedule timing ${contact.workHours.en} ${contact.workHours.ar}`
  );

  for (const branch of contact.branches) {
    parts.push(
      `branch ${branch.name.en} ${branch.name.ar}`
    );

    parts.push(
      `address location ${branch.address.en} ${branch.address.ar}`
    );

    parts.push(
      `phone tel ${branch.tel.join(' ')}`
    );

    if (branch.fax?.length) {
      parts.push(`fax ${branch.fax.join(' ')}`);
    }
  }

  return parts.join(' ');
}


