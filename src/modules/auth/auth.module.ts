import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
