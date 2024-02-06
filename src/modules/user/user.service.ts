import { Injectable } from '@nestjs/common'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class UserService {
	login(loginUserDto: LoginUserDto): void {
		return
	}

	register(registerUserDto: RegisterUserDto) {
		return
	}
}
