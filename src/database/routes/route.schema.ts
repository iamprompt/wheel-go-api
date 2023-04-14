import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import type { User } from '../users/user.schema'
import type { Place } from '../places/place.schema'

@Schema({ collection: 'routes' })
export class Route {
  @Prop({ type: String, required: true })
  type: string

  @Prop({ type: [LocationObject] })
  paths: Location[]

  @Prop()
  internalCode: string

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  origin: Place

  @Prop({ type: Types.ObjectId, ref: 'Place' })
  destination: Place

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User

  @Prop()
  distance: number

  @Prop()
  duration: number

  @Prop({
    type: String,
    default: 'draft',
    enum: ['draft', 'published', 'archived'],
  })
  status: string
}

export type RouteDocument = HydratedDocument<Route>
export const RouteSchema = SchemaFactory.createForClass(Route)