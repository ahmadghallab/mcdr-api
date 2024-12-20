import { Module } from "@nestjs/common";
import { SolutionsModule } from "./solutions/solutions.module";
import { ArticlesModule } from "./articles/articles.module";
import { PlacesModule } from "./places/places.module";
import { BannersModule } from "./banners/banners.module";

@Module({
  imports: [
    SolutionsModule,
    ArticlesModule,
    PlacesModule,
    BannersModule,
  ],
})
export class UserV1Module {}