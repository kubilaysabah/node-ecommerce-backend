import { Controller, Get, Query } from '@nestjs/common'

import { Roles } from '@shared/decorators/role.decorator'
import { Role } from '@shared/enums/role.enum'

import { CustomerService } from './customer.service'
import { FindCustomerQuery } from './dto/find-customer.query'

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Roles(Role.Admin)
	@Get()
	find(@Query() { id, email, phone }: FindCustomerQuery) {
		if (id || email || phone) {
			return this.customerService.find({ id, email, phone })
		}

		return this.customerService.findAll()
	}
}
