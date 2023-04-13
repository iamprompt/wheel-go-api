import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import type { Place } from '../places/place.schema'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { AnnouncementMetadata } from '../object/AnnouncementMetadataObject'
import { AnnouncementMetadataObject } from '../object/AnnouncementMetadataObject'
import type { User } from '../users/user.schema'

@Schema({ collection: 'announcements' })
export class Announcement {
  @Prop({ type: LangObjectDefinition })
  title: LangObject

  @Prop({ type: LangObjectDefinition })
  content: LangObject

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  place: Place

  @Prop({ type: LocationObject })
  location: Location

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Media' }] })
  images: string[]

  @Prop([String])
  tags: string[]

  @Prop({ type: AnnouncementMetadataObject })
  metadata: AnnouncementMetadata

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User

  @Prop({
    type: String,
    default: 'draft',
    enum: ['draft', 'published', 'archived'],
  })
  status: string
}

export type AnnouncementDocument = HydratedDocument<Announcement>
export const AnnouncementSchema = SchemaFactory.createForClass(Announcement)
