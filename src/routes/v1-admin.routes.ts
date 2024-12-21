import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domains/admin/v1/articles/articles.routes";
import { authRoutes } from "src/domains/admin/v1/auth/auth.routes";
import { bannersRoutes } from "src/domains/admin/v1/banners/banners.routes";
import { placesRoutes } from "src/domains/admin/v1/places/places.routes";
import { solutionsRoutes } from "src/domains/admin/v1/solutions/solutions.routes";
import { uploadRoutes } from "src/domains/admin/v1/upload/upload.routes";
import { usersRoutes } from "src/domains/admin/v1/users/users.routes";

export const v1AdminRoutes: Routes = [
  {
    path: '/admin-api/v1',
    children: [
      ...authRoutes,
      ...usersRoutes,
      ...placesRoutes,
      ...articlesRoutes,
      ...solutionsRoutes,
      ...uploadRoutes,
      ...bannersRoutes,
    ],
  },
];