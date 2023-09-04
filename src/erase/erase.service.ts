import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { NotesService } from '../notes/notes.service';
import { CredentialsService } from '../credentials/credentials.service';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class EraseService {
  constructor(
    private readonly userService: UsersService,
    private readonly noteService: NotesService,
    private readonly crendentialService: CredentialsService,
    private readonly cardsService: CardsService,
  ) { }

  async delete(eraseDto: EraseDto, user: User) {
    const validUser = await this.userService.findById(user.id);
    const validPassword = await bcrypt.compare(eraseDto.password, validUser.password);
    if (!validPassword) throw new UnauthorizedException('You are not allowed to delete this user');

    await this.noteService.deleteMany(validUser);
    await this.cardsService.deleteMany(validUser);
    await this.crendentialService.deleteMany(validUser);
    await this.userService.delete(validUser);
  }
}
