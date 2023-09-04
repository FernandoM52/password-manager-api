import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { UsersModule } from '../users/users.module';
import { EraseService } from './erase.service';
import { EraseRepository } from './erase.repository';
import { NotesModule } from '../notes/notes.module';
import { CardsModule } from '../cards/cards.module';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
  imports: [UsersModule, NotesModule, CardsModule, CredentialsModule],
  controllers: [EraseController],
  providers: [EraseService, EraseRepository],
  exports: [EraseService],
})
export class EraseModule { }
