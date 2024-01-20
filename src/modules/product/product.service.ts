import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../shared/prisma.service'

@Injectable()
export class ProductService {

  constructor(private prismaService: PrismaService) {
  }

  create({ url, code, content, description, name, price, rating, quantity }: CreateProductDto) {
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
      }
    });
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
