import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from "../prisma.service";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
