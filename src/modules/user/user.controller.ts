import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	login(@Body() loginDto: LoginUserDto): void {
		this.userService.login(loginDto)
	}

	@Post()
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.userService.register(registerUserDto)
	}
}
