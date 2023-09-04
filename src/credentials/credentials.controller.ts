import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Put, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardDto } from '../cards/dto/create-card.dto';

@UseGuards(AuthGuard)
@ApiTags('Credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates user credential data and encrypts the submitted password' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data creation body fields',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "When the user tries to create two credentials with the same title",
  })
  create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() user: UserPrisma
  ) {
    return this.credentialsService.create(user, createCredentialDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all user credentials' })
  findAll(@User() user: UserPrisma) {
    return this.credentialsService.findAll(user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'user credential id', example: 1 })
  @ApiOperation({ summary: "Returns a user-specific credential with the decrypted password according to the id sent by parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user searches for a credential that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user searches for a credential that does not exist",
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.credentialsService.findOne(+id, user);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'user credential id', example: 1 })
  @ApiOperation({ summary: "Update the user's credential according to the id sent in the route parameter" })
  @ApiBody({ type: UpdateCredentialDto })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to update a credential that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to update a credential that does not exist",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCredentialDto: UpdateCredentialDto,
    @User() user: UserPrisma
  ) {
    return this.credentialsService.update(+id, updateCredentialDto, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'user credential id', example: 1 })
  @ApiOperation({ summary: "Delete the user's credential according to the id sent in the route parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to delete a credential that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to delete a credential that does not exist",
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.credentialsService.remove(+id, user);
  }
}
