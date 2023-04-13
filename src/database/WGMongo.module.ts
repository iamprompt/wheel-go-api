import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users/user.schema'
import { UserDBService } from './users/user.service'
import { Media, MediaSchema } from './media/media.schema'
import { MediaDBService } from './media/media.services'
import { Place, PlaceSchema } from './places/place.schema'
import { PlaceDBService } from './places/place.services'
import { Facility, FacilitySchema } from './facilities/facility.schema'
import {
  Announcement,
  AnnouncementSchema,
} from './announcements/announcement.schema'
import { Review, ReviewSchema } from './reviews/review.schema'
import { FacilityDBService } from './facilities/facility.services'
import { AnnouncementDBService } from './announcements/announcement.service'
import { ReviewDBService } from './reviews/review.service'
import { Route, RouteSchema } from './routes/route.schema'
import { RouteDBService } from './routes/route.service'
import { WGConfigModule } from '~/config/WGConfig.module'
import type { Config } from '~/config/configuration'

@Module({
  imports: [
    WGConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<Config['MONGO_URI']>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Place.name, schema: PlaceSchema },
      { name: User.name, schema: UserSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Facility.name, schema: FacilitySchema },
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: Review.name, schema: ReviewSchema },
      { name: Route.name, schema: RouteSchema },
    ]),
  ],
  providers: [
    PlaceDBService,
    UserDBService,
    MediaDBService,
    FacilityDBService,
    AnnouncementDBService,
    ReviewDBService,
    RouteDBService,
  ],
  exports: [
    PlaceDBService,
    UserDBService,
    MediaDBService,
    FacilityDBService,
    AnnouncementDBService,
    ReviewDBService,
    RouteDBService,
  ],
})
export class WGMongoModule {}
