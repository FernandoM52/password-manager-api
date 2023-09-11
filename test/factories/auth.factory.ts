import { PrismaService } from "../../src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export class AuthFactory {
  private email: string;
  private password: string;
  private SALT = 10;

  constructor(private readonly prisma: PrismaService) { }

  withEmail(email?: string) {
    const userEmail = email || faker.internet.email();

    this.email = userEmail;
    return this;
  }

  withPassword(password?: string) {
    const userPassword = password ||
      faker.internet.password({
        length: 10,
        pattern: /[\w!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/,
      })


    this.password = userPassword;
    return this;
  }

  build() {
    return {
      email: this.email,
      password: this.password
    }
  }

  async persist() {
    const user = this.build();
    return await this.prisma.user.create({
      data: {
        ...user,
        password: bcrypt.hashSync(user.password, this.SALT)
      }
    });
  }
}