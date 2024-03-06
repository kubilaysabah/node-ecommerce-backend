import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { CustomerService } from '@modules/customer/customer.service'
import { AdminService } from '@modules/admin/admin.service'
import { RoleService } from '@modules/role/role.service'
import { AdminsOnRolesService } from '@modules/admins-on-roles/admins-on-roles.service'

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, CustomerService, AdminService, RoleService, AdminsOnRolesService],
})
export class AuthModule {}
