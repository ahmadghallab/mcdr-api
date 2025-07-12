import { Admin } from "../admins/entities/admin.entity";

export interface AuthResponse {
  accessToken: string, 
  refreshToken: string, 
  accessTokenExpiresIn: number, 
  refreshTokenExpiresIn: number, 
  user: Admin
}