import { IsEmail } from 'class-validator'

export class FindUserDto {
    @IsEmail()
    email: string
}

export class FindUserParams {
    @IsEmail()
    email?: string;

    id?: string;
}