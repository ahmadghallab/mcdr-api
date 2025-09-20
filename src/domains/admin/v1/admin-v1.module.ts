import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminsModule } from "./admins/admins.module";
import { SolutionsModule } from "./solutions/solutions.module";
import { ArticlesModule } from "./articles/articles.module";
import { FilesModule } from "./files/files.module";
import { PlacesModule } from "./places/places.module";
import { BannersModule } from "./banners/banners.module";
import { PagesModule } from "./pages/pages.module";
import { HighlightsModule } from "./highlights/highlights.module";
import { ReorderModule } from "./reorder/reorder.module";

@Module({
  imports: [
    AuthModule, 
    AdminsModule,
    SolutionsModule,
    ArticlesModule,
    FilesModule,
    PlacesModule,
    BannersModule,
    PagesModule,
    HighlightsModule,
    ReorderModule
  ]
})
export class AdminV1Module {}