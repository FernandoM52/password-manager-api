import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "../cards/dto/create-card.dto";
import { Card } from "@prisma/client";

@Injectable()
export class CardsHelper {
  private Cryptr = require('cryptr');
  private crypter: any;

  constructor() { this.crypter = new this.Cryptr(process.env.CRYPTR_SECRET) }

  encryptCodeAndPassword(createCardDto: CreateCardDto): CreateCardDto {
    return {
      ...createCardDto,
      code: this.crypter.encrypt(createCardDto.code),
      password: this.crypter.encrypt(createCardDto.password)
    };
  }

  decryptCodeAndPassword(card: Card) {
    return {
      ...card,
      code: this.crypter.decrypt(card.code),
      password: this.crypter.decrypt(card.password)
    };
  }
}