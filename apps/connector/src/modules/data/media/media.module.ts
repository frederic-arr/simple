import { Module } from '@nestjs/common';
import { ConfigModule, DbModule, TypesenseModule } from '../../common';
import { MediaService } from './media.service';

@Module({
  imports: [DbModule, TypesenseModule, ConfigModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
