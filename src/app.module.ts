import { Module } from '@nestjs/common'
import { DevtoolsModule } from '@nestjs/devtools-integration'

import { SharedModule } from '@shared/shared.module'

import { AuthModule } from '@modules/auth/auth.module'
import { CustomerModule } from '@modules/customer/customer.module'

@Module({
	imports: [
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
		}),
		SharedModule,
		AuthModule,
		CustomerModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
