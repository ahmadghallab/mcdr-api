import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domains/user/v1/articles/articles.routes";
import { bannersRoutes } from "src/domains/user/v1/banners/banners.routes";
import { placesRoutes } from "src/domains/user/v1/places/places.routes";
import { solutionsRoutes } from "src/domains/user/v1/solutions/solutions.routes";
import { updatesRoutes } from "src/domains/user/v1/updates/updates.routes";

export const v1UserRoutes: Routes = [
  {
    path: '/user-api/v1',
    children: [
      ...placesRoutes,
      ...articlesRoutes,
      ...solutionsRoutes,
      ...bannersRoutes,
      ...updatesRoutes
    ],
  },
];