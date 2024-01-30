import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '@shared/prisma.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'

@Injectable()
export class BrandService {
	constructor(private prismaService: PrismaService) {}

	create({ name, description, image }: CreateBrandDto) {
		try {
			return this.prismaService.brands.create({
				data: {
					name,
					description,
					image,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	findAll() {
		try {
			return this.prismaService.brands.findMany()
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	findOne(id: number) {
		try {
			return this.prismaService.brands.findUnique({
				where: {
					id,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	update(id: number, { name, description, image }: UpdateBrandDto) {
		try {
			return this.prismaService.brands.update({
				where: {
					id,
				},
				data: {
					name,
					description,
					image,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}

	remove(id: number) {
		try {
			return this.prismaService.brands.delete({
				where: {
					id,
				},
			})
		} catch (error) {
			throw new HttpException(error.message, error.status)
		}
	}
}
