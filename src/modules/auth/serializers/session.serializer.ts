import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser<T>(user: T, done: (err: Error, user: T) => void): void {
		done(null, user)
	}

	async deserializeUser(payload: string, done: (err: Error, payload: string) => void): Promise<void> {
		done(null, payload)
	}
}
