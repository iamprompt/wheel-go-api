import { Module } from '@nestjs/common'
import { RouteResolver } from './route.resolver'
import { RouteService } from './route.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [RouteResolver, RouteService],
})
export class RouteModule {}
