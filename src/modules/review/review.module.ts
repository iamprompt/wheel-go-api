import { Module } from '@nestjs/common'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { ReviewResolver } from './review.resolver'
import { ReviewService } from './review.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [ReviewResolver, ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
