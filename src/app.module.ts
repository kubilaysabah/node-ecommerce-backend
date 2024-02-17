import { Module } from '@nestjs/common'
import { DevtoolsModule } from '@nestjs/devtools-integration'

import { SharedModule } from '@shared/shared.module'

@Module({
	imports: [
		DevtoolsModule.register({
			http: process.env.NODE_ENV !== 'production',
		}),
		SharedModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
