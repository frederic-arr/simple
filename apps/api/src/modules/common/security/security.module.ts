/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Security module
 * Version: 2021-12-01
 */

import { Global, Module } from '@nestjs/common';
import { SecurityService } from './security.service';

@Global()
@Module({
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
