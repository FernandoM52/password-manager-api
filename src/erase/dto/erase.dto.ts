import { IsNotEmpty, IsString } from "class-validator";

export class EraseDto {
  @IsNotEmpty()
  @IsString()
  password: string
}