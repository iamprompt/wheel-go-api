import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.schema'
import { RatingObject } from '../object/ratingObject.schema'
import { Media } from '../media/media.schema'
import { OfficialReviewObject } from '../object/officialReview.schema'
import { Place } from '../place/place.schema'

@ObjectType()
export class Review {
  @Field(() => ID!)
  id: string

  @Field(() => Place, { nullable: true })
  place: Place

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => RatingObject, { nullable: true })
  rating: RatingObject

  @Field({ nullable: true })
  comment: string

  @Field(() => [Media], { nullable: true })
  images: Media[]

  @Field(() => [String], { nullable: true })
  tags: string[]

  @Field(() => OfficialReviewObject, { nullable: true })
  official: OfficialReviewObject
}
