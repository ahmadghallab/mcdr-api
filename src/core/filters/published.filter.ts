import { PublishStatus } from "../common/enums/publish-status.enum";

export function isPublished() {
  return { status: PublishStatus.Published };
}

export function isPublishedQuery(alias = 'p') {
  return `${alias}.status = '${PublishStatus.Published}'`;
}