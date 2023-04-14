import { Module } from '@nestjs/common'
import { MediaResolver } from './media.resolver'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [MediaResolver],
})
export class MediaModule {}
