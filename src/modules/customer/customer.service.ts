import { HttpException, Injectable } from '@nestjs/common'
import { RegisterCustomerDto } from './dto/register-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { FindCustomerDto } from './dto/find-customer.dto'
import { Customer } from './entities/customer.entity'

import { PrismaService } from '@shared/prisma.service'
import { Bcrypt } from '@utils/bcrypt'

@Injectable()
export class CustomerService {
	constructor(
		private prisma: PrismaService,
		private bcrypt: Bcrypt,
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
		return `This action returns all customer`
	}

	findOne({ email, phone, id }: FindCustomerDto) {
		return this.prisma.customer.findFirst({
			where: {
				id,
				phone,
				email,
			},
		})
	}

	update(id: number, updateCustomerDto: UpdateCustomerDto) {
		return `This action updates a #${id} customer`
	}

	remove(id: number) {
		return `This action removes a #${id} customer`
	}
}
