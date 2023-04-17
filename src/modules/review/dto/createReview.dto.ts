import { Field, InputType } from '@nestjs/graphql'
import { OfficialReviewObjectInput } from '~/modules/object/dto/officialReview.dto'
import { RatingObjectInput } from '~/modules/object/dto/ratingObject.dto'

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  user: string

  @Field(() => RatingObjectInput)
  rating: RatingObjectInput

  @Field()
  comment: string

  @Field(() => [String])
  images: string[]

  @Field(() => [String])
  tags: string[]

  @Field(() => OfficialReviewObjectInput)
  official: OfficialReviewObjectInput
}
