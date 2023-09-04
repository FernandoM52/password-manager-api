import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
  @ApiProperty({
    example: 'User title note',
    description: 'A title for user note'
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'User security note',
    description: 'A secure user note'
  })
  @IsNotEmpty()
  @IsString()
  note: string;
}
