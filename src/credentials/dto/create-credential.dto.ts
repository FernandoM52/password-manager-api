import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
  @ApiProperty({
    example: 'facebook',
    description: 'A title for user credential'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'https://www.facebook.com/login/',
    description: 'User Credential Url'
  })
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  url: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name associated with user credential'
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'uS3rP4ssw0rd@F4ceb00k',
    description: 'User Credential Password'
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
