import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { MediaDocument } from '../media/media.schema'
import type { PlaceMetadata } from '../object/PlaceMetadataObject'
import { PlaceMetadataObject } from '../object/PlaceMetadataObject'
import { Timestamp, TimestampConfig } from '../utils/timestamp'

@Schema({ collection: 'places', timestamps: TimestampConfig })
export class Place {
  @Prop()
  type: string

  @Prop({ type: LangObjectDefinition })
  name: LangObject

  @Prop({ type: LangObjectDefinition })
  address: LangObject

  @Prop(LocationObject)
  location: Location

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Media' }] })
  images: MediaDocument[]

  @Prop()
  internalCode: string

  @Prop({ type: PlaceMetadataObject })
  metadata: PlaceMetadata

  @Prop()
  status: string
}

export type PlaceDocument = HydratedDocument<Place, Timestamp>
export const PlaceSchema = SchemaFactory.createForClass(Place)