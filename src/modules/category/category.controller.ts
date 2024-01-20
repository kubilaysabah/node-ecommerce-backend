import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesInterceptor } from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";
import { Express } from 'express';
import { diskStorage } from 'multer';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    return cb(null, file.originalname.toLowerCase())
  }
})

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4, { storage }))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFiles(new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        new FileTypeValidator({ fileType: 'image/jpeg' })
    ]
  })) files: Array<Express.Multer.File>) {

    const images = files.map(file => ({
      name: file.filename,
      image: `./uploads/${file.filename}`
    }));

    return this.categoryService.create({
      ...createCategoryDto,
      images
    });
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
