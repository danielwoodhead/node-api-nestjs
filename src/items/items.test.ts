import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as matchers from '../../test/matchers';
import { EmptyLogger } from '../../test/nestjs/emptyLogger';
import { ItemsService } from './items.service';
import { ItemsModule } from './items.module';
import { initialise } from '../init';

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
  const mockItemsService = { getItem: jest.fn(() => Promise.resolve(item)) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ItemsModule],
    })
      .overrideProvider(ItemsService)
      .useValue(mockItemsService)
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
      expect(response).toBeValidationProblemDetails();
    });

    it('returns 500 if error thrown', async () => {
      mockItemsService.getItem.mockRejectedValueOnce(new Error('error'));
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeInternalServerErrorProblemDetails();
    });

    it('returns 404 if item not found', async () => {
      mockItemsService.getItem.mockResolvedValueOnce(undefined);
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response).toBeNotFoundProblemDetails();
    });

    it('returns 200', async () => {
      mockItemsService.getItem.mockResolvedValueOnce(item);
      const response = await request(app.getHttpServer()).get('/items/1');
      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toMatchObject(item);
    });
  });
});
