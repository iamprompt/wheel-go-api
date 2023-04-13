import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users/user.schema'
import { UserService } from './users/user.service'
import { Media, MediaSchema } from './media/media.schema'
import { MediaService } from './media/media.services'
import { Place, PlaceSchema } from './places/place.schema'
import { PlaceService } from './places/place.services'
import { Facility, FacilitySchema } from './facilities/facility.schema'
import {
  Announcement,
  AnnouncementSchema,
} from './announcements/announcement.schema'
import { Review, ReviewSchema } from './reviews/review.schema'
import { FacilityService } from './facilities/facility.services'
import { AnnouncementService } from './announcements/announcement.service'
import { ReviewService } from './reviews/review.service'
import { Route, RouteSchema } from './routes/route.schema'
import { RouteService } from './routes/route.service'
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
    PlaceService,
    UserService,
    MediaService,
    FacilityService,
    AnnouncementService,
    ReviewService,
    RouteService,
  ],
})
export class WGMongoModule {}
