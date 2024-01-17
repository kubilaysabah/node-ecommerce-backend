import {IsNotEmpty, Length} from "class-validator";

export class CreateRoleDto {
    @Length(3, 20)
    @IsNotEmpty()
    name: string;
}
