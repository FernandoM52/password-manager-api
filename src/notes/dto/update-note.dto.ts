import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  constructor(params?: Partial<UpdateNoteDto>) {
    super();
    Object.assign(this, params);
  }
}
