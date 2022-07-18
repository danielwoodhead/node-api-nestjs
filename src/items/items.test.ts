import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as matchers from '../../test/matchers';
import { EmptyLogger } from '../../test/nestjs/emptyLogger';
import { initialise } from '../init';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsModule } from './items.module';

expect.extend(matchers);

const item = {
  id: 1,
  name: 'Burger',
  price: 599,
  description: 'Tasty',
  image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png',
};

describe('items', () => {
  let app: INestApplication;
  const mockPrismaService = {
    item: { findUnique: jest.fn(() => Promise.resolve(item)) },
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useLogger(new EmptyLogger());
    initialise(app);
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /items/{id}', () => {
    it('returns 400 for invalid id', async () => {
      const response = await request(app.getHttpServer()).get('/items/foo');
      expect(response).toBeBadRequestProblemDetails();
    });

    it('returns 500 if error thrown', async () => {
      mockPrismaService.item.findUnique.mockRejectedValueOnce(
        new Error('error'),
      );
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeInternalServerErrorProblemDetails();
    });

    it('returns 404 if item not found', async () => {
      mockPrismaService.item.findUnique.mockResolvedValueOnce(undefined);
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeNotFoundProblemDetails();
    });

    it('returns 200', async () => {
      mockPrismaService.item.findUnique.mockResolvedValueOnce(item);
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toMatchObject(item);
    });
  });

  describe('POST /items', () => {
    const newItem = {
      name: 'Burger',
      price: 599,
      description: 'Tasty',
      image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png',
    };

    it('returns 400 for missing name', async () => {
      const { name: _, ...itemWithoutName } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutName);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 for missing price', async () => {
      const { price: _, ...itemWithoutPrice } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutPrice);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 for missing description', async () => {
      const { description: _, ...itemWithoutDescription } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutDescription);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 for missing image', async () => {
      const { image: _, ...itemWithoutImage } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutImage);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });
  });
});
