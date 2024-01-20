import { IsInt, IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer';

export class CreateImageDto {
    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsString()
    name: string
}

export class CreateCategoryDto {
    @IsOptional()
    @IsInt()
    parent_id?: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageDto)
    images: CreateImageDto[];
}
