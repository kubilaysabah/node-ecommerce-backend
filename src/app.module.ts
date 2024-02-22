import { Module } from '@nestjs/common'
import { DevtoolsModule } from '@nestjs/devtools-integration'

import { SharedModule } from '@shared/shared.module'
import { CustomerModule } from '@modules/customer/customer.module'
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { RoleModule } from './modules/role/role.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
	imports: [
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
		}),
		SharedModule,
		CustomerModule,
		AuthModule,
		AdminModule,
		RoleModule,
		CategoryModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
