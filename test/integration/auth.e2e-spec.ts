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

    it('Should create a new user and return status code 201', async () => {
      const userDto: CreateUserDto = new CreateUserDto({
        email: 'user@test.com',
        password: 'Str0ngP455w0Rd!'
      });

      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.CREATED);

      const users = await prisma.user.findMany();
      const user = users[0];
      expect(users).toHaveLength(1);
      expect(user).toEqual({
        id: expect.any(Number),
        email: expect.any(String),
        password: expect.any(String)
      });
    });

    it('Should not create a user with email that already exists and return status code 409', async () => {
      await new AuthFactory(prisma)
        .withEmail('user@test.com')
        .withPassword('Str0ngP455w0Rd!')
        .persist();

      const userDto: CreateUserDto = new CreateUserDto({
        email: 'user@test.com',
        password: 'Str0ngP455w0Rd!'
      });

      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.CONFLICT);
    });

    it("Should return status code 400 when body is missing", async () => {
      const userDto = new CreateUserDto();
      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.BAD_REQUEST);
    });

    it("Should return status code 400 when email is invalid", async () => {
      const userDto: CreateUserDto = new CreateUserDto({
        email: 'invalidEmail_format.com',
        password: 'Str0ngP455w0Rd!'
      });

      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.BAD_REQUEST);
    });

    it("Should return status code 400 when password is not strong enough", async () => {
      const userDto: CreateUserDto = new CreateUserDto({
        email: 'user@example.com',
        password: 'notStrongEnough123'
      });

      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.BAD_REQUEST);
    });

    it("Should return status code 400 when body is invalid", async () => {
      const userDto: CreateUserDto = new CreateUserDto({
        email: 'invalidEmail_format.com',
        password: 'notStrongEnough123'
      });

      await server.post('/users/sign-up').send(userDto).expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /users/sign-in', () => {
    it('Should return a token for user and status code 200', async () => {
      const password = 'Str0ngP455w0Rd!';
      const { email } = await new AuthFactory(prisma)
        .withEmail('user@test.com')
        .withPassword(password)
        .persist();

      const loginDto: LoginDto = new LoginDto({ email, password });

      const req = await server.post('/users/sign-in').send(loginDto)

      expect(req.status).toBe(HttpStatus.OK);
      expect(req.body).toEqual({ token: expect.any(String) });
    });

    it("Should return status code 400 when body is missing", async () => {
      const loginDto = new LoginDto();
      await server.post('/users/sign-in').send(loginDto).expect(HttpStatus.BAD_REQUEST);
    });

    it("Should return status code 401 when email is wrong", async () => {
      const password = 'Str0ngP455w0Rd';
      await new AuthFactory(prisma)
        .withEmail('user@test.com')
        .withPassword(password)
        .persist();

      const loginDto = new LoginDto({ email: 'OtherEmailRegistered@test.com', password });
      await server.post('/users/sign-in').send(loginDto).expect(HttpStatus.UNAUTHORIZED);
    });

    it("Should return status code 401 when passsword is wrong", async () => {
      const { email } = await new AuthFactory(prisma)
        .withEmail('user@test.com')
        .withPassword()
        .persist();

      const loginDto = new LoginDto({ email, password: 'otherPassword' });
      await server.post('/users/sign-in').send(loginDto).expect(HttpStatus.UNAUTHORIZED);
    });

    it("Should return status code 401 when body is invalid", async () => {
      await new AuthFactory(prisma)
        .withEmail('user@test.com')
        .withPassword()
        .persist();

      const loginDto = new LoginDto({ email: 'OtherEmailRegistered@test.com', password: 'otherPassword' });
      await server.post('/users/sign-in').send(loginDto).expect(HttpStatus.UNAUTHORIZED);
    });
  });
});