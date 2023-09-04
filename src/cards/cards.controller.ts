import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Put,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';

@UseGuards(AuthGuard)
@ApiTags('Cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates user card data and encrypts the security code and the card password' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data creation body fields',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "When the user tries to create two cards with the same title",
  })
  create(
    @Body() createCardDto: CreateCardDto,
    @User() user: UserPrisma
  ) {
    return this.cardsService.create(createCardDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'List all user cards' })
  findAll(@User() user: UserPrisma) {
    return this.cardsService.findAll(user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'user card id', example: 1 })
  @ApiOperation({ summary: "Returns the user's card according to the id sent in the route parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user searches for a card that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user searches for a card that does not exist",
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.cardsService.findOne(+id, user);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'user card id', example: 1 })
  @ApiOperation({ summary: "Update the user's card according to the id sent in the route parameter" })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to update a card that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to update a card that does not exist",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
    @User() user: UserPrisma
  ) {
    return this.cardsService.update(+id, updateCardDto, user);
  }


  @Delete(':id')
  @ApiParam({ name: 'id', description: 'user card id', example: 1 })
  @ApiOperation({ summary: "Delete the user's card according to the id sent in the route parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to delete a card that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to delete a card that does not exist",
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.cardsService.remove(+id, user);
  }
}
