import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: 'email@address.com',
    description: 'Your account email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Str0ngP4ssW0rD!',
    description: 'Your account password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(params?: Partial<LoginDto>) {
    if (params) Object.assign(this, params);
  }
}
