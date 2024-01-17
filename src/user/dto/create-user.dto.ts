import {IsNotEmpty, Length} from 'class-validator'

export class CreateUserDto {
    @Length(3, 20)
    @IsNotEmpty()
    name: string;
}
