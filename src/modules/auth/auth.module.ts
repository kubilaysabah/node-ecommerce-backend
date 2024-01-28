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
import { SessionSerializer } from '@modules/auth/session.serializer'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    }),
    PassportModule.register({
      session: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService, LocalStrategy, JwtStrategy, SessionSerializer],
})
export class AuthModule {}
