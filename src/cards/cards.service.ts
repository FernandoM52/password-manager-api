import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';
import { CardsHelper } from '../helpers/cards.helpers';
import { User } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardRepository: CardsRepository,
    private readonly cardHelper: CardsHelper,
  ) { }

  async create(createCardDto: CreateCardDto, user: User) {
    const card = await this.cardRepository.findByTitleAndUserId(createCardDto.title, user.id);
    if (card) throw new ConflictException('A card with this title already exists');

    const encryptedCard = this.cardHelper.encryptCodeAndPassword(createCardDto);
    return this.cardRepository.create(encryptedCard, user.id);
  }

  findAll(user: User) {
    return this.cardRepository.findAll(user.id);
  }

  async findOne(id: number, user: User) {
    return await this.validateCard(id, user.id);
  }

  async update(id: number, updateCardDto: UpdateCardDto, user: User) {
    await this.validateCard(id, user.id);
    return await this.cardRepository.update(id, updateCardDto, user.id);
  }

  async remove(id: number, user: User) {
    await this.validateCard(id, user.id);
    await this.cardRepository.delete(id, user.id);
  }

  private async validateCard(id: number, userId: number) {
    const card = await this.cardRepository.findOne(id);
    if (!card) throw new NotFoundException('Card not found');
    if (card.userId !== userId) throw new ForbiddenException("You don't have permission to this card");

    return card;
  }
}
