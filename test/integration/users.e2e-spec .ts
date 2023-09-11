import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { PrismaService } from "../../src/prisma/prisma.service";
import { E2EUtils } from "../utils/e2e-utils";
import { CreateUserDto } from "../../src/users/dto/create-user.dto";
import { AuthFactory } from "../factories/auth.factory";
import { LoginDto } from "../../src/users/dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../../src/auth/auth.module";
import { UsersModule } from "../../src/users/users.module";

describe('auth E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let server: request.SuperTest<request.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    }))

    await app.init();
    server = request(app.getHttpServer());

    await E2EUtils.cleanDb(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('POST users/signup', () => {

  });

  describe('POST /users/sign-in', () => {
    
  });
});