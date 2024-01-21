import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsString()
	image: string;
}
