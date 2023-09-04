import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  url: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
