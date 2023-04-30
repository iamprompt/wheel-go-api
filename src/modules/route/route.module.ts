import { Module } from '@nestjs/common'
import { ActivityLogModule } from '../activityLog/activityLog.module'
import { RouteResolver } from './route.resolver'
import { RouteService } from './route.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule, ActivityLogModule],
  providers: [RouteResolver, RouteService],
})
export class RouteModule {}
