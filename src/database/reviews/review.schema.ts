import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { Types } from 'mongoose'
import { User } from '../users/user.schema'
import type { Rating } from '../object/RatingObject'
import { RatingObject } from '../object/RatingObject'
import { Media } from '../media/media.schema'
import type { OfficialReview } from '../object/OfficialReviewObject'
import { OfficialReviewObject } from '../object/OfficialReviewObject'

@Schema({ collection: 'reviews' })
export class Review {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: RatingObject })
  rating: Rating

  @Prop()
  comment: string

  @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
  images: Media[]

  @Prop({ type: [{ type: String }] })
  tags: string[]

  @Prop({ type: OfficialReviewObject })
  official: OfficialReview
}

export type ReviewDocument = HydratedDocument<Review>
export const ReviewSchema = SchemaFactory.createForClass(Review)
