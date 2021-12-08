import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(80);
}
bootstrap();
