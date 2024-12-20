import { Routes } from "@nestjs/core";
import { articlesRoutes } from "src/domain/admin/v1/articles/articles.routes";
import { authRoutes } from "src/domain/admin/v1/auth/auth.routes";
import { bannersRoutes } from "src/domain/admin/v1/banners/banners.routes";
import { placesRoutes } from "src/domain/admin/v1/places/places.routes";
import { solutionsRoutes } from "src/domain/admin/v1/solutions/solutions.routes";
import { uploadRoutes } from "src/domain/admin/v1/upload/upload.routes";
import { usersRoutes } from "src/domain/admin/v1/users/users.routes";

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