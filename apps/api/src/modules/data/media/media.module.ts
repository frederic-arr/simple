/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media module
 * Version: 2021-12-01
 */

import { Module } from '@nestjs/common';
import { DbModule, TypesenseModule } from '../../common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [DbModule, TypesenseModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
