import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Bcrypt } from '@utils/bcrypt'
import { JwtService } from '@nestjs/jwt'

@Global()
@Module({
	imports: [],
	providers: [PrismaService, JwtService, Bcrypt],
	exports: [PrismaService, JwtService, Bcrypt],
})
export class SharedModule {}
