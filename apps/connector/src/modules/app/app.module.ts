import { Module, Logger } from '@nestjs/common';
import { HealthModule } from '../common/health/health.module';
import { DataModule } from '../data';
import { WinstonModule, utilities } from 'nest-winston';
import { transports, format } from 'winston';

@Module({
  imports: [
    DataModule,
    HealthModule,
    WinstonModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike('Connector', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
