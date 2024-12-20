import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { SolutionsModule } from "./solutions/solutions.module";
import { ArticlesModule } from "./articles/articles.module";
import { UploadModule } from "./upload/upload.module";
import { PlacesModule } from "./places/places.module";
import { BannersModule } from "./banners/banners.module";

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    SolutionsModule,
    ArticlesModule,
    UploadModule,
    PlacesModule,
    BannersModule,
  ],
})
export class AdminV1Module {}