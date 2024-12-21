import { AuthModule } from "./auth.module";

export const authRoutes = [
  {
    path: '/auth',
    module: AuthModule,
  },
];