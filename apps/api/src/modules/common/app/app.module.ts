/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Root application module
 * Version: 2021-12-01
 */

import { APP_NAME } from '../config/constants';
import { HealthModule } from '../health/health.module';
import { DataModule } from '../../data';
import { Module } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import { format, transports } from 'winston';
import { SecurityModule } from '../security';

@Module({
  imports: [
    DataModule,
    HealthModule,
    SecurityModule,
    WinstonModule.forRoot({
      transports: [
        // That's where you'd add the log sink
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(APP_NAME, { prettyPrint: true }),
          ),
        }),
      ],
    }),
  ],
})
export class AppModule {}
