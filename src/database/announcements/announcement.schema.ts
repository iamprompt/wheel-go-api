import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import { Place, PlaceDocument } from '../places/place.schema'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { AnnouncementMetadata } from '../object/AnnouncementMetadataObject'
import { AnnouncementMetadataObject } from '../object/AnnouncementMetadataObject'
import { User, UserDocument } from '../users/user.schema'
import { Media, MediaDocument } from '../media/media.schema'
import { STATUS } from '~/const/status'

@Schema({ collection: 'announcements' })
export class Announcement {
  @Prop({ type: LangObjectDefinition })
  title: LangObject

  @Prop({ type: LangObjectDefinition })
  content: LangObject

  @Prop({ type: Types.ObjectId, ref: Place.name })
  place: PlaceDocument

  @Prop(LocationObject)
  location: Location

  @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
  images: MediaDocument[]

  @Prop([String])
  tags: string[]

  @Prop({ type: AnnouncementMetadataObject })
  metadata: AnnouncementMetadata

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument

  @Prop({
    type: String,
    default: STATUS.DRAFT,
    enum: Object.values(STATUS),
  })
  status: string
}

export type AnnouncementDocument = HydratedDocument<Announcement>
export const AnnouncementSchema = SchemaFactory.createForClass(Announcement)
