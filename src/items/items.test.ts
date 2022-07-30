import {
  HttpStatus,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import * as request from 'supertest';
import * as matchers from '../../test/matchers';
import { EmptyLogger } from '../../test/nestjs/emptyLogger';
import { initialise } from '../init';
import { ItemsModule } from './items.module';
import { IItemsRepository } from './items.repository';

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
  const mockItemsRepository: IItemsRepository = {
    getItem: jest.fn(() => Promise.resolve(item)),
    createItem: jest.fn(() => Promise.resolve(item)),
    deleteItem: jest.fn(() => Promise.resolve()),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ItemsModule],
    })
      .overrideProvider('IItemsRepository')
      .useValue(mockItemsRepository)
      .overrideProvider(PrismaService)
      .useValue({}) // prevent attempt to connect to the database
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
    it('returns 400 if ID is invalid', async () => {
      const response = await request(app.getHttpServer()).get('/items/foo');
      expect(response).toBeBadRequestProblemDetails();
    });

    it('returns 500 if error is thrown', async () => {
      jest
        .mocked(mockItemsRepository.getItem)
        .mockRejectedValueOnce(new Error('error'));
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeInternalServerErrorProblemDetails();
    });

    it('returns 404 if item is not found', async () => {
      jest.mocked(mockItemsRepository.getItem).mockResolvedValueOnce(undefined);
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeNotFoundProblemDetails();
    });

    it('returns 200 if item is found', async () => {
      jest.mocked(mockItemsRepository.getItem).mockResolvedValueOnce(item);
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

    it('returns 400 if request is missing name', async () => {
      const { name: _, ...itemWithoutName } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutName);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 if request is missing price', async () => {
      const { price: _, ...itemWithoutPrice } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutPrice);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 if request is missing description', async () => {
      const { description: _, ...itemWithoutDescription } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutDescription);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 400 if request is missing image', async () => {
      const { image: _, ...itemWithoutImage } = newItem;
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(itemWithoutImage);
      expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    });

    it('returns 500 if error is thrown', async () => {
      jest
        .mocked(mockItemsRepository.createItem)
        .mockRejectedValueOnce(new Error('error'));
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(newItem);
      expect(response).toBeInternalServerErrorProblemDetails();
    });

    it('returns 201 if item is created', async () => {
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(newItem);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('DELETE /items/{id}', () => {
    it('returns 400 if ID is invalid', async () => {
      const response = await request(app.getHttpServer()).delete('/items/foo');
      expect(response).toBeBadRequestProblemDetails();
    });

    it('returns 404 if item is not found', async () => {
      jest
        .mocked(mockItemsRepository.deleteItem)
        .mockRejectedValueOnce(new NotFoundException());
      const response = await request(app.getHttpServer()).delete('/items/1');
      expect(response).toBeNotFoundProblemDetails();
    });

    it('returns 500 is error is thrown', async () => {
      jest
        .mocked(mockItemsRepository.deleteItem)
        .mockRejectedValueOnce(new Error('error'));
      const response = await request(app.getHttpServer()).delete('/items/1');
      expect(response).toBeInternalServerErrorProblemDetails();
    });

    it('returns 204 if item is deleted', async () => {
      const response = await request(app.getHttpServer()).delete('/items/1');
      expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    });
  });
});
