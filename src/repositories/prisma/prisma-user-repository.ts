import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import { User } from 'src/entities/user';
import { PrismaService } from 'src/config/prisma';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }
}
