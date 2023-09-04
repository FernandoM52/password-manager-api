import { Injectable } from "@nestjs/common";
import { CreateCredentialDto } from "../credentials/dto/create-credential.dto";
import { Credential } from "@prisma/client";

@Injectable()
export class CredentialsHelper {
  private Cryptr = require('cryptr');
  private crypter: any;

  constructor() { this.crypter = new this.Cryptr(process.env.CRYPTR_SECRET) }

  encryptCredential(credential: CreateCredentialDto): CreateCredentialDto {
    return {
      ...credential,
      password: this.crypter.encrypt(credential.password)
    };
  }

  decryptCredential(credential: Credential) {
    return {
      ...credential,
      password: this.crypter.decrypt(credential.password)
    };
  }
}