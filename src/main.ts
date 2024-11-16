import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  SwaggerConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
