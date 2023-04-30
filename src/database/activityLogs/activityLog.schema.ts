import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Timestamp, TimestampConfig } from '../utils/timestamp'
import { Review, ReviewDocument } from '../reviews/review.schema'
import { Route, RouteDocument } from '../routes/route.schema'
import { User, UserDocument } from '../users/user.schema'

@Schema({ collection: 'activityLogs', timestamps: TimestampConfig })
export class ActivityLog {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: UserDocument

  @Prop()
  action: string

  @Prop()
  point: number

  @Prop({ type: Types.ObjectId, ref: Review.name })
  review: ReviewDocument

  @Prop({ type: Types.ObjectId, ref: Route.name })
  route: RouteDocument
}

export type ActivityLogDocument = HydratedDocument<ActivityLog, Timestamp>
export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog)
