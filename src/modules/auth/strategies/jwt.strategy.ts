import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '@admin/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY || '1234567890',
		})
	}

	async validate(email: string) {
		const user = await this.userService.findOne({
			email,
		})

		if (!user) {
			throw new UnauthorizedException()
		}

		return user
	}
}
