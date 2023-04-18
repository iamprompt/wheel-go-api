import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import type { Location } from '../object/LocationObject'
import { LocationObject } from '../object/LocationObject'
import { User, UserDocument } from '../users/user.schema'
import { Place, PlaceDocument } from '../places/place.schema'
import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'

@Schema({ collection: 'routes' })
export class Route {
  @Prop({ type: String, enum: Object.values(ROUTE_TYPES) })
  type: string

  @Prop({ type: [LocationObject] })
  paths: Location[]

  @Prop()
  internalCode: string

  @Prop({ type: Types.ObjectId, ref: Place.name })
  origin: PlaceDocument

  @Prop({ type: Types.ObjectId, ref: Place.name })
  destination: PlaceDocument

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument

  @Prop()
  distance: number

  @Prop()
  duration: number

  @Prop({
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.DRAFT,
  })
  status: string
}

export type RouteDocument = HydratedDocument<Route>
export const RouteSchema = SchemaFactory.createForClass(Route)
