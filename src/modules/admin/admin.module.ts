import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'

import { UserModule } from '@admin/user/user.module'
import { RoleModule } from '@admin/role/role.module'
import { CategoryModule } from '@admin/category/category.module'
import { ProductModule } from '@admin/product/product.module'
import { BrandModule } from '@admin/brand/brand.module'

@Module({
	imports: [UserModule, RoleModule, CategoryModule, ProductModule, BrandModule],
	controllers: [],
	providers: [],
})
export class AdminModule {}
