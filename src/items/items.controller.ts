import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../common/notFound.interceptor';
import { ProblemDetails } from '../common/problemDetails';
import { ItemsService } from './items.service';
import { FindOneParams, Item } from './items.types';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Item })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetails) },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetails) },
      },
    },
  })
  @UseInterceptors(NotFoundInterceptor)
  getItem(@Param() params: FindOneParams): Promise<Item> {
    return this.itemsService.getItem(params.id);
  }
}
