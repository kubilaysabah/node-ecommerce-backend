import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../shared/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {
  }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.categories.create({
      data: {
        parent_id: createCategoryDto.parent_id,
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        content: createCategoryDto.content,
        url: createCategoryDto.url,
        images: {
          create: createCategoryDto.images
        }
      }
    });
  }

  findAll() {
    return this.prismaService.categories.findMany();
  }

  findOne(id: number) {
    return this.prismaService.categories.findUnique({
      where: {
        id,
      }
    })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.categories.update({
      where: {
        id,
      },
      data: {
        parent_id: updateCategoryDto.parent_id,
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
        content: updateCategoryDto.content,
        url: updateCategoryDto.url,
        images: {
          update: {
            data: updateCategoryDto.images,
            where: {
              id,
            }
          },
        }
      }
    })
  }

  remove(id: number) {
    return this.prismaService.categories.delete({
      where: {
        id,
      }
    });
  }
}
