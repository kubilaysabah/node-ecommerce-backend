import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { RegisterAuthDto } from './dto/register-auth.dto'

import { LoginAuthDto } from '@modules/auth/dto/login-auth.dto'
import { RegisterEntity } from '@modules/auth/entities/register.entity'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('register')
	register(@Body() registerAuthDto: RegisterAuthDto): Promise<RegisterEntity> {
		return this.authService.register(registerAuthDto)
	}

	@Post('login')
	login(@Body() loginAuthDto: LoginAuthDto): Promise<string> {
		return this.authService.login(loginAuthDto)
	}
}
