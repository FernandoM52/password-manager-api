import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { EraseDto } from './dto/erase.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) { }

  @Delete()
  remove(
    @Body() eraseDto: EraseDto,
    @User() user: UserPrisma
  ) {
    return this.eraseService.delete(eraseDto, user);
  }
}
