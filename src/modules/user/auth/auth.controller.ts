import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	create(@Body() createAuthDto: RegisterAuthDto) {
		return this.authService.create(createAuthDto)
	}

	@Get()
	findAll() {
		return this.authService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.authService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAuthDto: LoginAuthDto) {
		return this.authService.update(+id, updateAuthDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authService.remove(+id)
	}
}
