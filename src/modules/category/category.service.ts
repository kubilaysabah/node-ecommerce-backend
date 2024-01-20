import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {
  }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.categories.create({
      data: {
        // parent_id: createCategoryDto.parent_id,
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        content: createCategoryDto.content,
        url: createCategoryDto.url,
        // images: {
        //   create: createCategoryDto.images
        // }
      }
    });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
