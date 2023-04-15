import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import type { PlaceDocument } from '../places/place.schema'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { AnnouncementMetadata } from '../object/AnnouncementMetadataObject'
import { AnnouncementMetadataObject } from '../object/AnnouncementMetadataObject'
import type { UserDocument } from '../users/user.schema'
import { MediaDocument } from '../media/media.schema'

@Schema({ collection: 'announcements' })
export class Announcement {
  @Prop({ type: LangObjectDefinition })
  title: LangObject

  @Prop({ type: LangObjectDefinition })
  content: LangObject

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  place: PlaceDocument

  @Prop(LocationObject)
  location: Location

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Media' }] })
  images: MediaDocument[]

  @Prop([String])
  tags: string[]

  @Prop({ type: AnnouncementMetadataObject })
  metadata: AnnouncementMetadata

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: UserDocument

  @Prop({
    type: String,
    default: 'draft',
    enum: ['draft', 'published', 'archived'],
  })
  status: string
}

export type AnnouncementDocument = HydratedDocument<Announcement>
export const AnnouncementSchema = SchemaFactory.createForClass(Announcement)
