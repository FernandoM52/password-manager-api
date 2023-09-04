import { PartialType } from '@nestjs/mapped-types';
import { CreateCredentialDto } from './create-credential.dto';

export class UpdateCredentialDto extends PartialType(CreateCredentialDto) {
  constructor(params?: Partial<UpdateCredentialDto>) {
    super();
    Object.assign(this, params);
  }
}
