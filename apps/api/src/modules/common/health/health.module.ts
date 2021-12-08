/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Health module
 * Version: 2021-12-01
 */

import { Global, Module } from '@nestjs/common';
import { DbModule } from '../database';
import { TypesenseModule } from '../typesense';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

// TODO: Move to shared lib
@Global()
@Module({
  imports: [TypesenseModule, DbModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
