import { IsEmail, IsInt, IsPhoneNumber, IsString } from "class-validator";

export class ValidateUserEntity {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsPhoneNumber('TR')
  phone: string;

  @IsString()
  image: string;

  @IsInt()
  id: number;
}
