import { Module } from '@nestjs/common'

import { RoleModule } from '@admin/role/role.module'
import { CategoryModule } from '@admin/category/category.module'
import { BrandModule } from '@admin/brand/brand.module'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [RoleModule, CategoryModule, BrandModule, AuthModule],
	controllers: [],
	providers: [],
	exports: [],
})
export class AdminModule {}
