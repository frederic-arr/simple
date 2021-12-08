import { Module } from '@nestjs/common';
import { DbModule, TypesenseModule } from '..';
import { MediaModule } from '../../data/media';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TypesenseModule, DbModule, MediaModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
