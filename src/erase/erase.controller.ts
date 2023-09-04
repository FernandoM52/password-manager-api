import { Body, Controller, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { EraseDto } from './dto/erase.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) { }

  @Delete()
  @ApiOperation({ summary: "Allows the user to delete their account and erase all data created" })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "If the user sends the incorrect registration password",
  })
  remove(
    @Body() eraseDto: EraseDto,
    @User() user: UserPrisma
  ) {
    return this.eraseService.delete(eraseDto, user);
  }
}
