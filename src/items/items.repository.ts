import { CreateItemRequest, Item } from './items.types';

export interface IItemsRepository {
  getItem(id: number): Promise<Item | null>;
  createItem(request: CreateItemRequest): Promise<Item>;
  deleteItem(id: number): Promise<void>;
}
