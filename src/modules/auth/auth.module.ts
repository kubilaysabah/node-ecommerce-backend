import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { UserService } from '../user/user.service'
import { RoleService } from '../role/role.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService],
})
export class AuthModule {}
