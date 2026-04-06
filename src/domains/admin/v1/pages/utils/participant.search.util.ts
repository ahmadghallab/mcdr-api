import { createSearchBuilder } from "src/core/search/search.util";
import { Participant } from "../entities/participant.entity";
import { participantTypeLabels } from "../enums/participant-type.enum";

export function buildParticipantSearchableText(participant: Participant): string {
  const { add, build } = createSearchBuilder();

  const type = participantTypeLabels[participant.type]

  add(
    `name اسم ${participant.ename} ${participant.aname}`,
    `code كود ${participant.code}`,
    `phone هاتف ${participant.phone}`,
    `fax فاكس ${participant.phone}`,
    `email mail بريد ايميل ${participant.email}`,
    `address عنوان ${participant.eaddress} ${participant.aaddress}`,
    `website موقع الكتروني ويب سايت ${participant.website}`,
    `company type نوع الشركة ${type.en} ${type.ar}`
  );

  return build();
}