import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import MulterConfig from '../config/multer.config'

@Module({
	imports: [
		MulterModule.register(MulterConfig),
	],
})
export class UploadModule {
}