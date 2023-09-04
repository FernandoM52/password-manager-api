import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCardDto: CreateCardDto, userId: number) {
    return await this.prisma.card.create({
      data: { ...createCardDto, userId },
      select: {
        id: true,
        title: true,
        number: true,
        issuer: true,
        virtual: true,
        type: true,
        userId: true
      },
    });
  }

  async findByTitleAndUserId(title: string, userId: number) {
    return await this.prisma.card.findUnique({
      where: {
        title_userId: { title, userId }
      }
    });
  }

  async findAll(userId: number) {
    return await this.prisma.card.findMany({
      where: { userId },
      select: { id: true, title: true },
    });
  }

  async findOne(id: number) {
    return await this.prisma.card.findUnique({ where: { id } });
  }

  async update(id: number, updateCardDto: UpdateCardDto, userId: number) {
    return await this.prisma.card.update({
      where: { id, userId },
      data: updateCardDto
    });
  }

  async delete(id: number, userId: number) {
    return await this.prisma.card.delete({ where: { id, userId } });
  }

  async deleteMany(userId: number) {
    return await this.prisma.card.deleteMany({ where: { userId } });
  }
}