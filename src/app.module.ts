import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma';
import { UserRepository } from './repositories/user-repository';
import { RedisUserRepository } from './repositories/cache/redis-user-repository';
import { RedisService } from './config/redis';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    RedisService,
    PrismaUserRepository,
    {
      provide: UserRepository,
      useClass: RedisUserRepository,
    },
  ],
})
export class AppModule {}
