import { Module } from '@nestjs/common';
import { MediaModule } from './media';

@Module({
  imports: [MediaModule],
})
export class DataModule {}
