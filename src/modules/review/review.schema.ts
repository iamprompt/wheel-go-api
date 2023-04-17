import { Field, ID, ObjectType } from '@nestjs/graphql'
import { User } from '../user/user.schema'
import { RatingObject } from '../object/ratingObject.schema'
import { Media } from '../media/media.schema'
import { OfficialReviewObject } from '../object/officialReview.schema'

@ObjectType()
export class Review {
  @Field(() => ID!)
  id: string

  @Field(() => User)
  user: User

  @Field(() => RatingObject)
  rating: RatingObject

  @Field()
  comment: string

  @Field(() => [Media])
  images: Media[]

  @Field(() => [String])
  tags: string[]

  @Field(() => OfficialReviewObject)
  official: OfficialReviewObject
}
