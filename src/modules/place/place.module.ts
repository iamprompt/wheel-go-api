import { Module } from '@nestjs/common'
import { RatingModule } from '../rating/rating.module'
import { PlaceResolver } from './place.resolver'
import { PlaceService } from './place.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, RatingModule],
  providers: [PlaceResolver, PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
