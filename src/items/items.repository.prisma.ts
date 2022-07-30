import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaErrorCode } from '../prisma/prisma.errorCode';
import { PrismaService } from '../prisma/prisma.service';
import { IItemsRepository } from './items.repository';
import { CreateItemRequest, Item } from './items.types';

@Injectable()
export class PrismaItemsRepository implements IItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getItem(id: number): Promise<Item | null> {
    return this.prismaService.item.findUnique({
      where: {
        id: +id,
      },
    });
  }

  async createItem(request: CreateItemRequest): Promise<Item> {
    return this.prismaService.item.create({
      data: {
        name: request.name,
        price: request.price,
        description: request.description,
        image: request.image,
      },
    });
  }

  async deleteItem(id: number): Promise<void> {
    try {
      await this.prismaService.item.delete({
        where: {
          id: +id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == PrismaErrorCode.REQUIRED_RECORDS_NOT_FOUND) {
          throw new NotFoundException();
        }
      }
      throw e;
    }
  }
}
