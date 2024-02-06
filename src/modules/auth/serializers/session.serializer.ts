import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser<T>(user: T, done: (err: Error, user: T) => void): void {
		done(null, user)
	}

	deserializeUser(payload: string, done: (err: Error, payload: string) => void): void {
		done(null, payload)
	}
}
