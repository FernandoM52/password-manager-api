import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  constructor(params?: Partial<UpdateCardDto>) {
    super();
    Object.assign(this, params);
  }
}
