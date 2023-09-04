import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'email@address.com',
    description: 'Your account email',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Str0ngP4ssW0rD!',
    description: 'Your account password. Must have 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character',
    minLength: 10,
  })
  @IsStrongPassword({
    minLength: 10,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1
  })
  password: string;
}
