import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ProblemDetails } from './common/problemDetails';
import { initialise } from './init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initialise(app);

  const config = new DocumentBuilder()
    .setTitle('Node API NestJS')
    .setDescription('A node API created with NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ProblemDetails],
  });
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
