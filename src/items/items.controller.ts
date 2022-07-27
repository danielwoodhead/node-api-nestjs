import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestApiResponse,
  NotFoundApiResponse,
} from '../common/apiResponse';
import { NotFoundInterceptor } from '../common/notFound.interceptor';
import { ItemsService } from './items.service';
import { CreateItemRequest, FindOneParams, Item } from './items.types';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiResponse({ status: HttpStatus.OK, type: Item })
  @BadRequestApiResponse()
  @NotFoundApiResponse()
  @UseInterceptors(NotFoundInterceptor)
  @Get(':id')
  getItem(@Param() params: FindOneParams): Promise<Item> {
    return this.itemsService.getItem(params.id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: Item })
  @BadRequestApiResponse()
  @Post()
  createItem(@Body() request: CreateItemRequest): Promise<Item> {
    return this.itemsService.createItem(request);
  }

  @Delete(':id')
  deleteItem(@Param() params: FindOneParams): Promise<Item> {
    return this.itemsService.deleteItem(params.id);
  }
}
