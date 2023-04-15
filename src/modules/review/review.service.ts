import { Injectable } from '@nestjs/common'
import { ReviewRepository } from '~/database/reviews/review.service'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}
}
