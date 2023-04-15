import { Module } from '@nestjs/common'
import { AnnouncementResolver } from './announcement.resolver'
import { AnnouncementService } from './announcement.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [AnnouncementResolver, AnnouncementService],
})
export class AnnouncementModule {}
