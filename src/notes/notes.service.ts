import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { User } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly noteRepository: NotesRepository) { }

  async create(createNoteDto: CreateNoteDto, user: User) {
    const note = await this.noteRepository.findByTitleAndUserId(createNoteDto.title, user.id);
    if (note) throw new ConflictException('A note with this title already exists');

    return this.noteRepository.create(createNoteDto, user.id);
  }

  findAll(user: User) {
    return this.noteRepository.findAll(user.id);
  }

  async findOne(id: number, user: User) {
    return await this.valdiateNote(id, user.id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    await this.valdiateNote(id, user.id);
    return await this.noteRepository.update(id, updateNoteDto, user.id);
  }

  async remove(id: number, user: User) {
    await this.valdiateNote(id, user.id);
    await this.noteRepository.delete(id, user.id);
  }

  private async valdiateNote(id: number, userId: number) {
    const note = await this.noteRepository.findOne(id);
    if (!note) throw new NotFoundException('Note not found');
    if (note.userId !== userId) throw new ConflictException("You don't have permission to this note");

    return note;
  }
}
