import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

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
