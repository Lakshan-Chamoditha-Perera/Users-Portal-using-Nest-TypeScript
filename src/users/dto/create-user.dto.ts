import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"; //npm i class-validator

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Role must be one of the following: INTERN, ENGINEER, ADMIN'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}