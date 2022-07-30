import { Inject, Injectable } from '@nestjs/common';
import { IItemsRepository } from './items.repository';
import { CreateItemRequest, Item } from './items.types';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('IItemsRepository')
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async getItem(id: number): Promise<Item> {
    return this.itemsRepository.getItem(id);
  }

  async createItem(request: CreateItemRequest): Promise<Item> {
    return this.itemsRepository.createItem(request);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemsRepository.deleteItem(id);
  }
}
