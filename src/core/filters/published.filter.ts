import { PublishStatus } from "../common/enums/publish-status.enum";

export function isPublished() {
  return { status: PublishStatus.Published };
}