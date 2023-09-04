import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EraseDto {
  @ApiProperty({
    example: 'Str0ngP4ssW0rD!',
    description: "Refers to the user's registration password"
  })
  @IsNotEmpty()
  @IsString()
  password: string
}