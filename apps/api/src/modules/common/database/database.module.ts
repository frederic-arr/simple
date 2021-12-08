/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Database module
 * Version: 2021-12-01
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { DbService } from './database.service';

// TODO: Move to shared lib
@Module({
  imports: [ConfigModule],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
