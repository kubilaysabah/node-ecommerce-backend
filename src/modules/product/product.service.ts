import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../shared/prisma.service'

@Injectable()
export class ProductService {

  constructor(private prismaService: PrismaService) {
  }

  create({ url, code, content, description, name, price, rating, quantity, ProductImageRelations, ProductCategoryRelations, ProductBrandRelations }: CreateProductDto) {
    return this.prismaService.products.create({
      data: {
        url,
        code,
        content,
        description,
        name,
        price,
        rating,
        quantity,
        ProductBrandRelations: {
          create: ProductBrandRelations
        },
        ProductCategoryRelations: {
          create: ProductCategoryRelations
        },
        ProductImageRelations: {
          create: ProductImageRelations
        },
      }
    });
  }

  findAll() {
    return this.prismaService.products.findMany();
  }

  findOne(id: number) {
    return this.prismaService.products.findFirst({
      where: {
        id: id
      },
      include: {
        ProductCategoryRelations: true,
        ProductImageRelations: true
      }
    })
  }

  update(id: number, {
    url,
    code,
    content,
    description,
    name,
    price,
    rating,
    quantity,
    ProductBrandRelations,
    ProductImageRelations,
    ProductCategoryRelations
  }: UpdateProductDto) {
    this.prismaService.products.update({
      where: {
        id: id
      },
      data: {
        url,
        code,
        content,
        description,
        name,
        price,
        rating,
        quantity,
        ProductBrandRelations: {
          create: ProductBrandRelations
        },
        ProductCategoryRelations: {
          create: ProductCategoryRelations
        },
        ProductImageRelations: {
          create: ProductImageRelations
        },
      }
    })
  }

  remove(id: number) {
    return this.prismaService.products.delete({
      where: {
        id: id
      }
    })
  }
}
