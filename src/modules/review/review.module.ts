import { Module } from '@nestjs/common'
import { ReviewResolver } from './review.resolver'
import { ReviewService } from './review.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [ReviewResolver, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
