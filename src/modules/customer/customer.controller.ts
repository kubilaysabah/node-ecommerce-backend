import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { FindCustomerQuery } from './dto/find-customer.query'
import { RegisterCustomerDto } from './dto/register-customer.dto'

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get()
	find(@Query() { id, email, phone }: FindCustomerQuery) {
		if (id || email || phone) {
			return this.customerService.findOne({ id, email, phone })
		}

		return this.customerService.findAll()
	}

	@Post('register')
	register(@Body() registerCustomerDto: RegisterCustomerDto) {
		return this.customerService.register(registerCustomerDto)
	}
}
