import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

// Strategies
import { LocalStrategy } from "@modules/auth/local.strategy";
import { JwtStrategy } from './jwt.strategy';

// Other Services
import { UserService } from '@modules/user/user.service'
import { RoleService } from '@modules/role/role.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
