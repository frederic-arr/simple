/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Data module
 * Version: 2021-12-01
 */

import { Module } from '@nestjs/common';
import { MediaModule } from './media';

@Module({
  imports: [MediaModule],
})
export class DataModule {}
