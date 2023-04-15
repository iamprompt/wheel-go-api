import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import { Place, PlaceDocument } from '../places/place.schema'
import type { LangObject } from '../object/LangObject'
import { LangObjectDefinition } from '../object/LangObject'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { FacilityMetadata } from '../object/FacilityMetadataObject'
import { FacilityMetadataObject } from '../object/FacilityMetadataObject'

@Schema({ collection: 'facilities' })
export class Facility {
  @Prop({ type: Types.ObjectId, ref: Place.name })
  parent: PlaceDocument

  @Prop()
  type: string

  @Prop({ type: LangObjectDefinition })
  detail: LangObject

  @Prop({ type: LocationObject })
  location: Location

  @Prop({ type: FacilityMetadataObject })
  metadata: FacilityMetadata

  @Prop({
    type: String,
    default: 'draft',
    enum: ['draft', 'published', 'archived'],
  })
  status: string
}

export type FacilityDocument = HydratedDocument<Facility>
export const FacilitySchema = SchemaFactory.createForClass(Facility)
