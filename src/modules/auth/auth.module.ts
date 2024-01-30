import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

// Strategies
import { JwtStrategy } from '@auth/strategies/jwt.strategy'

// Other Services
import { UserService } from '@admin/user/user.service'
import { RoleService } from '@admin/role/role.service'

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '60s' },
		}),
		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, RoleService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
