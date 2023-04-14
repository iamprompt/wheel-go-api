import { Module } from '@nestjs/common'
import { MediaResolver } from './media.resolver'
import { MediaService } from './media.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
