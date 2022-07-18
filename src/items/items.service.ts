import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemRequest, Item } from './items.types';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getItem(id: number): Promise<Item> {
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

  async deleteItem(id: number): Promise<Item> {
    return this.prismaService.item.delete({
      where: {
        id: +id,
      },
    });
  }
}
