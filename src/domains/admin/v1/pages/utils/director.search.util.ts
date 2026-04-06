import { createSearchBuilder } from "src/core/search/search.util";
import { Director } from "../entities/director.entity";

export function buildDirectorSearchableText(director: Director): string {
  const { add, build } = createSearchBuilder();

  add(
    `اعضاء مجلس الادارة`,
    `Board member named ${director.title.en} ${director.name.en}`,
    `عضو مجلس إدارة ${director.title.ar} ${director.name.ar}`,
    `Holds the title ${director.position.en}`,
    `منصب ${director.position.ar}`
  );

  return build();
}