import { Module } from '@nestjs/common'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { BadgeModule } from '../badge/badge.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, ActivityLogModule, BadgeModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
