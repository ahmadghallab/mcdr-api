import { Module } from "@nestjs/common";
import { SolutionsModule } from "./solutions/solutions.module";
import { ArticlesModule } from "./articles/articles.module";
import { PlacesModule } from "./places/places.module";
import { BannersModule } from "./banners/banners.module";
import { UpdatesModule } from "./updates/updates.module";
import { PagesModule } from "./pages/pages.module";
import { HighlightsModule } from "./highlights/highlights.module";

@Module({
  imports: [
    SolutionsModule,
    ArticlesModule,
    PlacesModule,
    BannersModule,
    UpdatesModule,
    PagesModule,
    HighlightsModule
  ],
})
export class UserV1Module {}