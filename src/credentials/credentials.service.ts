import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { CredentialsHelper } from '../helpers/credentials.helper';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly credentialRepository: CredentialsRepository,
    private readonly credentialHelper: CredentialsHelper,
  ) { }

  async create(user: User, createCredentialDto: CreateCredentialDto) {
    const credential = await this.credentialRepository.findByTitleAndUserId(createCredentialDto.title, user.id);
    if (credential) throw new ConflictException('A credential with this title already exists');

    const encryptedCredential = this.credentialHelper.encryptCredential(createCredentialDto);
    return this.credentialRepository.create(encryptedCredential, user.id);
  }

  findAll(user: User) {
    return this.credentialRepository.findAll(user.id);
  }

  async findOne(id: number, user: User) {
    const credential = await this.validateCrential(id, user.id);
    const decryptedCredential = this.credentialHelper.decryptCredential(credential);

    return decryptedCredential;
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto, user: User) {
    await this.validateCrential(id, user.id);
    return this.credentialRepository.update(id, updateCredentialDto, user.id);
  }

  async remove(id: number, user: User) {
    await this.validateCrential(id, user.id);
    await this.credentialRepository.delete(id, user.id);
  }

  private async validateCrential(id: number, userId: number) {
    const credential = await this.credentialRepository.findOne(id);
    if (!credential) throw new NotFoundException('Credential not found');
    if (credential.userId !== userId) throw new ForbiddenException("You don't have permission to this credential");

    return credential;
  }
}
