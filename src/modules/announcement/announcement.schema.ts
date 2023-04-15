import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Place } from '../place/place.schema'
import { Media } from '../media/media.schema'
import { User } from '../user/user.schema'
import { AnnouncementMetadata } from '../object/announcementMeta.schema'
import { Location } from '../object/location.schema'

@ObjectType()
export class Announcement {
  @Field(() => ID!)
  id: string

  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  content: string

  @Field(() => Place, { nullable: true })
  place: Place

  @Field(() => Location, { nullable: true })
  location: Location

  @Field(() => [Media], { nullable: true, defaultValue: [] })
  images: Media[]

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags: string[]

  @Field(() => AnnouncementMetadata, { nullable: true })
  metadata: AnnouncementMetadata

  @Field(() => User, { nullable: true })
  user: User

  @Field()
  status: string
}
