import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { RegisterEntity } from './entities/register.entity'
import { RegisterAuthDto } from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

import { PrismaService } from '@services/prisma.service'
import { BcryptService } from '@services/bcrypt.service'

import { CustomerService } from '@modules/customer/customer.service'
import { AdminService } from '@modules/admin/admin.service'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
		private bcryptService: BcryptService,
		private customerService: CustomerService,
		private adminService: AdminService,
	) {}

	async register({
		email,
		password,
		passwordAgain,
		phone,
		firstname,
		lastname,
	}: RegisterAuthDto): Promise<RegisterEntity> {
		const findUser = await this.customerService.find({ email, phone })

		if (findUser) {
			throw new HttpException('User already exists', 409)
		}

		if (password !== passwordAgain) {
			throw new HttpException('Passwords do not match', 400)
		}

		const user = await this.prismaService.customer.create({
			data: {
				phone,
				email,
				firstname,
				lastname,
				password: await this.bcryptService.hash(password),
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
		const findCustomer = await this.customerService.find({ email })

		if (!findCustomer) {
			const findAdmin = await this.adminService.find({ email })

			if (!findAdmin) {
				throw new HttpException('User not found', 404)
			}

			if (!(await this.bcryptService.compare(password, findAdmin.password))) {
				throw new HttpException('Invalid password', 401)
			}

			return this.jwtService.signAsync({
				email: findAdmin.email,
				id: findAdmin.id,
				phone: findAdmin.phone,
				firstname: findAdmin.firstname,
				lastname: findAdmin.lastname,
			})
		}

		if (!(await this.bcryptService.compare(password, findCustomer?.password))) {
			throw new HttpException('Invalid password', 401)
		}

		return this.jwtService.signAsync({
			email: findCustomer.email,
			id: findCustomer.id,
			phone: findCustomer.phone,
			firstname: findCustomer.firstname,
			lastname: findCustomer.lastname,
		})
	}
}
