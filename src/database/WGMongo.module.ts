import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './users/user.schema'
import { UserRepository } from './users/user.service'
import { Media, MediaSchema } from './media/media.schema'
import { MediaRepository } from './media/media.services'
import { Place, PlaceSchema } from './places/place.schema'
import { PlaceRepository } from './places/place.services'
import { Facility, FacilitySchema } from './facility/facility.schema'
import {
  Announcement,
  AnnouncementSchema,
} from './announcements/announcement.schema'
import { Review, ReviewSchema } from './reviews/review.schema'
import { FacilityRepository } from './facility/facility.services'
import { AnnouncementRepository } from './announcements/announcement.service'
import { ReviewRepository } from './reviews/review.service'
import { Route, RouteSchema } from './routes/route.schema'
import { RouteRepository } from './routes/route.service'
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
    PlaceRepository,
    UserRepository,
    MediaRepository,
    FacilityRepository,
    AnnouncementRepository,
    ReviewRepository,
    RouteRepository,
  ],
  exports: [
    PlaceRepository,
    UserRepository,
    MediaRepository,
    FacilityRepository,
    AnnouncementRepository,
    ReviewRepository,
    RouteRepository,
  ],
})
export class WGMongoModule {}
