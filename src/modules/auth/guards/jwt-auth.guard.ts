import { Reflector } from '@nestjs/core'
import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {
		super()
	}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])

		if (isPublic) {
			// 💡 See this condition
			return true
		}

		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			throw new UnauthorizedException()
		}

		try {
			await this.jwtService.verifyAsync(token, {
				secret: process.env.SECRET_KEY,
			})
		} catch {
			throw new UnauthorizedException()
		}
		return true
	}

	handleRequest(err, user) {
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException()
		}
		return user
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const { headers } = request
		const [type, token] = headers['authorization']?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
