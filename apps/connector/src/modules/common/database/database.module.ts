import { Module } from '@nestjs/common';
import { ConfigModule } from '..';
import { DbService } from './database.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
