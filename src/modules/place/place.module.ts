import { Module } from '@nestjs/common'
import { PlaceResolver } from './place.resolver'
import { PlaceService } from './place.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [PlaceResolver, PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
