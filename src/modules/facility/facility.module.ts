import { Module } from '@nestjs/common'
import { FacilityResolver } from './facility.resolver'
import { FacilityService } from './facility.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [FacilityResolver, FacilityService],
})
export class FacilityModule {}
