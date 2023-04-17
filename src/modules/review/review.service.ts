import { Injectable } from '@nestjs/common'
import { Review } from './review.schema'
import { ReviewFactory } from './review.factory'
import { CreateReviewInput } from './dto/createReview.dto'
import { ReviewRepository } from '~/database/reviews/review.service'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async findAll(language = 'th'): Promise<Review[]> {
    const reviews = await this.reviewRepository.findAll()
    return ReviewFactory.createFromDatabase(reviews, language)
  }

  async findOne(id: string, language = 'th'): Promise<Review> {
    const review = await this.reviewRepository.findOne(id)
    return ReviewFactory.createFromDatabase(review, language)
  }

  async create(review: CreateReviewInput, language = 'th'): Promise<Review> {
    const reviewToSave = ReviewFactory.createToSave(review)
    const createdReview = await this.reviewRepository.create(reviewToSave)
    return ReviewFactory.createFromDatabase(createdReview, language)
  }
}
