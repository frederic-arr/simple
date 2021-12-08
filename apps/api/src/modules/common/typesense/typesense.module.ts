/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Typesense module
 * Version: 2021-12-01
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { TypesenseService } from './typesense.service';

@Module({
  imports: [ConfigModule],
  providers: [TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {}
