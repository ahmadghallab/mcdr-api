import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domains/admin/v1/articles/articles.routes";
import { authRoutes } from "src/domains/admin/v1/auth/auth.routes";
import { bannersRoutes } from "src/domains/admin/v1/banners/banners.routes";
import { placesRoutes } from "src/domains/admin/v1/places/places.routes";
import { solutionsRoutes } from "src/domains/admin/v1/solutions/solutions.routes";
import { filesRoutes } from "src/domains/admin/v1/files/files.routes";
import { adminsRoutes } from "src/domains/admin/v1/admins/admins.routes";
import { pagesRoutes } from "src/domains/admin/v1/pages/pages.routes";
import { highlightsRoutes } from "src/domains/admin/v1/highlights/highlights.routes";

export const v1AdminRoutes: Routes = [
  {
    path: '/admin-api/v1',
    children: [
      ...authRoutes,
      ...adminsRoutes,
      ...placesRoutes,
      ...articlesRoutes,
      ...solutionsRoutes,
      ...filesRoutes,
      ...bannersRoutes,
      ...pagesRoutes,
      ...highlightsRoutes
    ],
  },
];