import { NestFactory } from '@nestjs/core';
import { env } from 'node:process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT ?? 3333);
}
bootstrap();