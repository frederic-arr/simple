import { Module } from '@nestjs/common';
import { ConfigModule } from '..';
import { TypesenseService } from './typesense.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [TypesenseService],
  exports: [TypesenseService],
})
export class TypesenseModule {}
