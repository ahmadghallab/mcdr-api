import { Participant } from "src/domains/admin/v1/pages/entities/participant.entity";

export function localizeParticipant(
  participant: Participant,
  lang: string
) {
  return {
    ...participant,
    name: lang === 'ar' ? participant.aname : participant.ename,
    address: lang === 'ar' ? participant.aaddress : participant.eaddress,
    board: participant.board?.map(b => ({
      ...b,
      name: lang === 'ar' ? b.aname : b.ename,
    })),
  };
}

export function localizeParticipants(
  participants: Participant[],
  lang: string
) {
  return participants.map(p => localizeParticipant(p, lang));
}
