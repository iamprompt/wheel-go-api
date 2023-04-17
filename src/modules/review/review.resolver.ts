import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Review } from './review.schema'
import { ReviewService } from './review.service'
import { CreateReviewInput } from './dto/createReview.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviews(@ActiveLang() lang: string): Promise<Review[]> {
    return this.reviewService.find(lang)
  }

  @Query(() => Review)
  async getReviewById(
    @Args('id', { type: () => ID }) id: string,
    @ActiveLang() lang: string
  ): Promise<Review> {
    return this.reviewService.findById(id, lang)
  }

  @Mutation(() => Review)
  async createReview(
    @Args('review') review: CreateReviewInput,
    @ActiveLang() lang: string
  ): Promise<Review> {
    return this.reviewService.create(review, lang)
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id', { type: () => ID }) id: string,
    @Args('review') review: CreateReviewInput,
    @ActiveLang() lang: string
  ): Promise<Review> {
    return this.reviewService.update(id, review, lang)
  }
}
