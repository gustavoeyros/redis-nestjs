import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user-repository';
import { User } from 'src/entities/user';
import { RedisService } from 'src/config/redis';
import { PrismaUserRepository } from '../prisma/prisma-user-repository';

@Injectable()
export class RedisUserRepository implements UserRepository {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaUserRepository: PrismaUserRepository,
  ) {}
  async findMany(): Promise<User[]> {
    const cachedUsers = await this.redisService.get('users');

    if (!cachedUsers) {
      const users = await this.prismaUserRepository.findMany();
      await this.redisService.set('users', JSON.stringify(users), 'EX', 15);
      console.log('From Database');
      return users;
    }

    console.log('From Cache');
    return JSON.parse(cachedUsers);
  }
}
