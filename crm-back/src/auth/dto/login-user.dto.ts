import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class LoginUserDto {

    @IsString()
    @IsOptional()
    id: string

    @IsEmail()
    @IsString()
    email: string

    @IsString()
    password: string
}