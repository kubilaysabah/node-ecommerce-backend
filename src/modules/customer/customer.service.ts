import { HttpException, Injectable } from '@nestjs/common'
import { RegisterCustomerDto } from './dto/register-customer.dto'
import { FindCustomerQuery } from './dto/find-customer.query'
import { Customer } from './entities/customer.entity'

import { PrismaService } from '@shared/prisma.service'
import { BcryptService } from '@shared/bcrypt.service'

@Injectable()
export class CustomerService {
	constructor(
		private prisma: PrismaService,
		private bcrypt: BcryptService,
	) {}

	async register({
		email,
		password,
		passwordAgain,
		phone,
		firstname,
		lastname,
	}: RegisterCustomerDto): Promise<Customer> {
		const findUser = await this.findOne({ email, phone })

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

	findAll() {
		return this.prisma.customer.findMany()
	}

	async findOne({ email, phone, id }: FindCustomerQuery): Promise<Customer> {
		const user = await this.prisma.customer.findFirst({
			where: {
				id,
				phone,
				email,
			},
		})

		if (!user) {
			throw new HttpException('User not found', 404)
		}

		return {
			email: user.email,
			phone: user.phone,
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
		}
	}
}
