import { IsInt, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(3, 20)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @Length(3, 20)
  firstname: string;

  @IsNotEmpty()
  @Length(3, 20)
  lastname: string;

  @IsNotEmpty()
  @IsInt()
  role: number;
}
