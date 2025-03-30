import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AdminsModule } from "./admins/admins.module";
import { SolutionsModule } from "./solutions/solutions.module";
import { ArticlesModule } from "./articles/articles.module";
import { UploadModule } from "./upload/upload.module";
import { PlacesModule } from "./places/places.module";
import { BannersModule } from "./banners/banners.module";
import { PagesModule } from "./pages/pages.module";
import { DirectorsModule } from "./directors/directors.module";
import { FaqsModule } from "./faqs/faqs.module";

@Module({
  imports: [
    AuthModule, 
    AdminsModule,
    SolutionsModule,
    ArticlesModule,
    UploadModule,
    PlacesModule,
    BannersModule,
    PagesModule,
    DirectorsModule,
    FaqsModule
  ]
})
export class AdminV1Module {}