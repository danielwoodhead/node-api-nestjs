import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ItemsController } from './items.controller';
import { PrismaItemsRepository } from './items.repository.prisma';
import { ItemsService } from './items.service';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    { provide: 'IItemsRepository', useClass: PrismaItemsRepository },
  ],
})
export class ItemsModule {}
