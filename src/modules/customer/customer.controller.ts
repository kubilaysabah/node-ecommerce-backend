import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { RegisterCustomerDto } from './dto/register-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'

@Controller('customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get()
	find(@Query('id') id: string, @Query('email') email: string, @Query('phone') phone: string) {
		if (id || email || phone) {
			return this.customerService.findOne({ id, email, phone })
		}

		return this.customerService.findAll()
	}

	@Post('register')
	register(@Body() registerCustomerDto: RegisterCustomerDto) {
		return this.customerService.register(registerCustomerDto)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
		return this.customerService.update(+id, updateCustomerDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.customerService.remove(+id)
	}
}
