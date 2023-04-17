import { Injectable } from '@nestjs/common'
import { Review } from './review.schema'
import { ReviewFactory } from './review.factory'
import { CreateReviewInput } from './dto/createReview.dto'
import { ReviewRepository } from '~/database/reviews/review.service'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async find(language = 'th'): Promise<Review[]> {
    const reviews = await this.reviewRepository.find()
    return ReviewFactory.createFromDatabase(reviews, language)
  }

  async findById(id: string, language = 'th'): Promise<Review> {
    const review = await this.reviewRepository.findById(id)
    return ReviewFactory.createFromDatabase(review, language)
  }

  async create(review: CreateReviewInput, language = 'th'): Promise<Review> {
    const reviewToSave = ReviewFactory.createToSave(review)
    const createdReview = await this.reviewRepository.create(reviewToSave)
    return ReviewFactory.createFromDatabase(createdReview, language)
  }

  async update(
    id: string,
    review: CreateReviewInput,
    language = 'th'
  ): Promise<Review> {
    const reviewToSave = ReviewFactory.createToSave(review)
    const updatedReview = await this.reviewRepository.update(id, reviewToSave)
    return ReviewFactory.createFromDatabase(updatedReview, language)
  }
}
