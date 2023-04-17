import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Review } from './review.schema'
import { ReviewService } from './review.service'
import { CreateReviewInput } from './dto/createReview.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  async reviews(@ActiveLang() language: string): Promise<Review[]> {
    return this.reviewService.findAll(language)
  }

  @Query(() => Review)
  async review(
    @Args('id', { type: () => ID }) id: string,
    @ActiveLang() language: string
  ): Promise<Review> {
    return this.reviewService.findOne(id, language)
  }

  @Mutation(() => Review)
  async createReview(
    @Args('review') review: CreateReviewInput,
    @ActiveLang() language: string
  ): Promise<Review> {
    return this.reviewService.create(review, language)
  }
}
