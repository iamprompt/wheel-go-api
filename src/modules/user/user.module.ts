import { Module } from '@nestjs/common'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
