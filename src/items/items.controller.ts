import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  async getItem(@Param() params: FindOneParams): Promise<Item> {
    return this.itemsService.getItem(params.id);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: Item })
  @BadRequestApiResponse()
  @Post()
  async createItem(@Body() request: CreateItemRequest): Promise<Item> {
    return this.itemsService.createItem(request);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @BadRequestApiResponse()
  @NotFoundApiResponse()
  @Delete(':id')
  async deleteItem(@Param() params: FindOneParams): Promise<void> {
    await this.itemsService.deleteItem(params.id);
  }
}
