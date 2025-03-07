import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        console.log('Prisma module initialized');
        await this.$connect();
    }

    async onModuleDestroy() {
        console.log('Prisma module destroyed');
        await this.$disconnect();
    }
}
