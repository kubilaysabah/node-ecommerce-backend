import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service'
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prismaService: PrismaService) {
  }

  create({ name, description, image }: CreateBrandDto) {
    return this.prismaService.brands.create({
      data: {
        name,
        description,
        image
      }
    })
  }

  findAll() {
    return this.prismaService.brands.findMany();
  }

  findOne(id: number) {
    return this.prismaService.brands.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, { name, description, image }: UpdateBrandDto) {
    return this.prismaService.brands.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image
      }
    })
  }

  remove(id: number) {
    return this.prismaService.brands.delete({
      where: {
        id
      }
    });
  }
}
