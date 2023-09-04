import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCredentialDto: CreateCredentialDto, userId: number) {
    return await this.prisma.credential.create({
      data: { ...createCredentialDto, userId, },
      select: {
        id: true,
        title: true,
        url: true,
        username: true,
        userId: true
      },
    });
  }

  async findByTitleAndUserId(title: string, userId: number) {
    return await this.prisma.credential.findUnique({
      where: {
        title_userId: { title, userId }
      }
    });
  }

  async findAll(userId: number) {
    return await this.prisma.credential.findMany({
      where: { userId },
      select: { id: true, title: true, }
    });
  }

  async findOne(id: number) {
    return await this.prisma.credential.findUnique({ where: { id } });
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto, userId: number) {
    return await this.prisma.credential.update({
      where: { id, userId },
      data: updateCredentialDto
    });
  }

  async delete(id: number, userId: number) {
    return await this.prisma.credential.delete({ where: { id, userId } });
  }

  async deleteMany(userId: number) {
    return await this.prisma.credential.deleteMany({ where: { userId } });
  }
}