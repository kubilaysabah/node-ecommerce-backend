import {IsNotEmpty, Length, IsPhoneNumber, IsEmail, IsInt } from 'class-validator'

export class UpdateUserDto {
    @Length(3, 20)
    @IsNotEmpty()
    firstname: string;

    @Length(3, 20)
    @IsNotEmpty()
    lastname: string;

    image?: string;

    @IsNotEmpty()
    @IsPhoneNumber('TR')
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(3, 20)
    @IsNotEmpty()
    password: string;

    @IsInt()
    role: number;
}
