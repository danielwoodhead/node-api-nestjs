import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmptyLogger } from '../test/nestjs/emptyLogger';
import { AppModule } from './app.module';
import { initialise } from './init';
import { PrismaService } from './prisma/prisma.service';

describe('app', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
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

  it('returns 404 for unknown route', async () => {
    await request(app.getHttpServer()).get('/unknown').expect(404);
  });

  it('/health returns 200', async () => {
    await request(app.getHttpServer()).get('/health').expect(200);
  });
});
