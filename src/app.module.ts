import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ItemsModule } from './items/items.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ItemsModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
