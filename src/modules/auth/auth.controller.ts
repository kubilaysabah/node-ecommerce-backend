import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from '@auth/dto/login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() registerDTO: RegisterDTO) {
		return this.authService.register(registerDTO)
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('login')
	login(@Request() req: { user: LoginDTO }, @Body() loginDTO: LoginDTO) {
		return this.authService.login(req.user)
	}
}
