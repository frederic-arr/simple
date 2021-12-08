/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Configuration module
 * Version: 2021-12-01
 */

import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
