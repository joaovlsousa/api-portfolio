import { NestFactory } from '@nestjs/core';
import { env } from 'node:process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [env.WEBSITE_URL, env.PORTFOLIO_URL],
    methods: ['GET', 'POST'],
  });
  await app.listen(env.PORT ?? 3333);
}
bootstrap();
