import { Injectable } from '@nestjs/common'
import { Review } from './review.schema'
import { ReviewFactory } from './review.factory'
import { ReviewRepository } from '~/database/reviews/review.service'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findAll(): Promise<Review[]> {
    const reviews = await this.reviewRepository.findAll()
    return ReviewFactory.createFromDatabase(reviews)
  }
}
