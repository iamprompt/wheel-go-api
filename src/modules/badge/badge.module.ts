import { Module } from '@nestjs/common'
import { BadgeService } from './badge.service'
import { BadgeResolver } from './badge.resolver'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [BadgeService, BadgeResolver],
  exports: [BadgeService],
})
export class BadgeModule {}
