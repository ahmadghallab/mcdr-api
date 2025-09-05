
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: AdminsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const user = await this.userService.findEmail(email);   

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Your account is currently inactive. Please reach out to support.');
    }

    const tokens = await this.generateTokens(user.id);

    return { ...tokens, user };
  }

  async generateTokens(userId: number) {
    const payload = { sub: userId };

    const accessTokenExpiresIn = this.configService.get<number>('jwt.accessTokenExpiresIn');
    const refreshTokenExpiresIn = this.configService.get<number>('jwt.refreshTokenExpiresIn');

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn,
    });

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, hashedToken);

    return { 
      accessToken, 
      refreshToken,
      accessTokenExpiresIn: accessTokenExpiresIn*1000,
      refreshTokenExpiresIn: refreshTokenExpiresIn*1000
    };
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify(token);      

      const user = await this.userService.findOne(payload.sub);

      if (!user || !user.refreshToken) throw new UnauthorizedException();

      const isValid = await bcrypt.compare(token, user.refreshToken);

      if (!isValid) throw new UnauthorizedException('Invalid refresh token');

      const tokens = await this.generateTokens(user.id);

      return { ...tokens, user };

    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyAccessToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null);
  }
}
