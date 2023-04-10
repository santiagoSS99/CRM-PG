import { IsString, MinLength, MaxLength, IsEmail, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateCustomerDto {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    surnames: string;

    @IsString()
    @MinLength(2)
    @MaxLength(50)
    @IsOptional()
    country: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(7)
    @IsOptional()
    t_number: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsDateString()
    @IsOptional()
    f_birthday: string;

    @IsBoolean()
    notifications: boolean;
}
