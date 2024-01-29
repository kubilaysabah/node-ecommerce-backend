import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindUserParams {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    id?: string;
}