import { createSearchBuilder } from "src/core/search/search.util";
import { Translation } from "src/core/common/types/translation.type";

export function buildFileSearchableText(file: { name: Translation; url: Translation }): string {
  const { add, build } = createSearchBuilder();

  add(
    `${file.name.en}. You can access it here: ${file.url.en}`,
    `${file.name.ar}. يمكنك الوصول إليه من هنا: ${file.url.ar}`,
  );

  return build();
}