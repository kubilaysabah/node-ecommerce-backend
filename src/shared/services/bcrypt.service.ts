import { Injectable } from '@nestjs/common'

@Injectable()
export class BcryptService {
	async hash(password: string, saltRounds: number = 10): Promise<string> {
		const bcrypt = await import('bcrypt')
		const salt = await bcrypt.genSalt(saltRounds)
		return bcrypt.hash(password, salt)
	}

	async compare(password: string, hashedPassword: string): Promise<boolean> {
		const bcrypt = await import('bcrypt')
		return bcrypt.compare(password, hashedPassword)
	}
}
