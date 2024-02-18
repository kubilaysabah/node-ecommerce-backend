import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from './prisma.service'
import { BcryptService } from './bcrypt.service'

@Global()
@Module({
	imports: [],
	providers: [JwtService, PrismaService, BcryptService],
	exports: [JwtService, PrismaService, BcryptService],
})
export class SharedModule {}
