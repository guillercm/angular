import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name: string;

    @MinLength(6)
    password: string;

}
