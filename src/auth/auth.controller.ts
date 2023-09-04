import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import {
  ApiBody, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/sign-up")
  @ApiOperation({ summary: 'Register a user and encrypts the sent password' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email or password has invalid format',
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("/sign-in")
  @ApiOperation({ summary: 'Log into the app' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email or password are incorrect',
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
