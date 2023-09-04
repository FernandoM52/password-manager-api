import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @ApiOperation({ summary: 'Creates security user note data' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data creation body fields',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "When the user tries to create two notes with the same title",
  })
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @User() user: UserPrisma
  ) {
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'List all user notes' })
  findAll(@User() user: UserPrisma) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'user note id', example: 1 })
  @ApiOperation({ summary: "Returns the user's note according to the id sent in the route parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user searches for a note that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user searches for a note that does not exist",
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.notesService.findOne(+id, user);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'user note id', example: 1 })
  @ApiOperation({ summary: "Update the user's note according to the id sent in the route parameter" })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to update a note that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to update a note that does not exist",
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
    @User() user: UserPrisma
  ) {
    return this.notesService.update(+id, updateNoteDto, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'user note id', example: 1 })
  @ApiOperation({ summary: "Delete the user's note according to the id sent in the route parameter" })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "When the user try to delete a note that is not theirs",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "When the user try to delete a note that does not exist",
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPrisma
  ) {
    return this.notesService.remove(+id, user);
  }
}
