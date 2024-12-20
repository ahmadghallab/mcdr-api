import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domain/user/v1/articles/articles.routes";
import { bannersRoutes } from "src/domain/user/v1/banners/banners.routes";
import { placesRoutes } from "src/domain/user/v1/places/places.routes";
import { solutionsRoutes } from "src/domain/user/v1/solutions/solutions.routes";

export const v1UserRoutes: Routes = [
  {
    path: '/user-api/v1',
    children: [
      ...placesRoutes,
      ...articlesRoutes,
      ...solutionsRoutes,
      ...bannersRoutes,
    ],
  },
];