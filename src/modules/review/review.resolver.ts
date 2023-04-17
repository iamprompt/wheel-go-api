import { Query, Resolver } from '@nestjs/graphql'
import { Review } from './review.schema'
import { ReviewService } from './review.service'

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  async reviews(): Promise<Review[]> {
    return this.reviewService.findAll()
  }
}
