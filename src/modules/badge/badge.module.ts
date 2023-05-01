import { Module } from '@nestjs/common'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { BadgeService } from './badge.service'
import { BadgeResolver } from './badge.resolver'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [BadgeService, BadgeResolver],
  exports: [BadgeService],
})
export class BadgeModule {}
