/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Application's entrypoint
 * Version: 2021-12-01
 */

import { AppModule } from './modules/common/app';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { loadHttpPort } from './modules/common/config/config.service';

/**
 * The main function
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableShutdownHooks();
  await app.listen(loadHttpPort(), '0.0.0.0');
}
void bootstrap();
