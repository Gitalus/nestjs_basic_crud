import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.useGlobalPipes(new ValidationPipe({
  // transform: true, // Con transform castea los objetos al dto
  // })); // Se pueden crear validaciones globales
  await app.listen(3000);
}
bootstrap();
