import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, IsUrl } from 'class-validator';

export class Item {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;
}

export class Items {
  [key: number]: Item;
}

export class FindOneParams {
  @ApiProperty()
  @IsNumberString()
  id: number;
}

export class CreateItemRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}
