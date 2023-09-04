import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createNoteDto: CreateNoteDto, userId: number) {
    return await this.prisma.note.create({
      data: { ...createNoteDto, userId }
    });
  }

  async findByTitleAndUserId(title: string, userId: number) {
    return await this.prisma.note.findUnique({
      where: {
        title_userId: { title, userId }
      }
    });
  }

  async findAll(userId: number) {
    return await this.prisma.note.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return await this.prisma.note.findUnique({ where: { id } });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    return await this.prisma.note.update({
      where: { id, userId },
      data: updateNoteDto
    });
  }

  async delete(id: number, userId: number) {
    return await this.prisma.note.delete({ where: { id, userId } });
  }
}