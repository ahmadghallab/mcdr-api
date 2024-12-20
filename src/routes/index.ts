import { Routes } from "@nestjs/core";
import { v1AdminRoutes } from "./v1-admin.routes";
import { v1UserRoutes } from "./v1-user.routes";

export const routes: Routes = [
  ...v1AdminRoutes,
  ...v1UserRoutes,
];