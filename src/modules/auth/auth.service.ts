import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { RegisterEntity } from './entities/register.entity'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

import { PrismaService } from '@services/prisma.service'
import { BcryptService } from '@services/bcrypt.service'

import { CustomerService } from '@modules/customer/customer.service'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService,
		private bcrypt: BcryptService,
		private customer: CustomerService,
	) {}

	async register({
		email,
		password,
		passwordAgain,
		phone,
		firstname,
		lastname,
	}: RegisterAuthDto): Promise<RegisterEntity> {
		const findUser = await this.customer.find({ email, phone })

		if (findUser) {
			throw new HttpException('User already exists', 409)
		}

		if (password !== passwordAgain) {
			throw new HttpException('Passwords do not match', 400)
		}

		const user = await this.prisma.customer.create({
			data: {
				phone,
				email,
				firstname,
				lastname,
				password: await this.bcrypt.hash(password),
				created_at: new Date(),
				updated_at: new Date(),
			},
		})

		return {
			email: user.email,
			phone: user.phone,
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
		}
	}

	@HttpCode(HttpStatus.OK)
	async login({ email, password }: LoginAuthDto): Promise<string> {
		const user = await this.customer.find({ email })

		if (!user) {
			throw new HttpException('User not found', 404)
		}

		if (!(await this.bcrypt.compare(password, user.password))) {
			throw new HttpException('Invalid password', 401)
		}

		return this.jwtService.signAsync({
			email: user.email,
			id: user.id,
			phone: user.phone,
			firstname: user.firstname,
			lastname: user.lastname,
		})
	}
}
