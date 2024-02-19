import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'

import { RoleService } from '@modules/role/role.service'

@Module({
	controllers: [AdminController],
	providers: [AdminService, RoleService],
})
export class AdminModule {}
