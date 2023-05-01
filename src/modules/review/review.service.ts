import { Injectable } from '@nestjs/common'
import { ActivityLogService } from '../activityLog/activityLog.service'
import { Review } from './review.schema'
import { ReviewFactory } from './review.factory'
import { CreateReviewInput } from './dto/createReview.dto'
import { GetReviewsInput } from './dto/getReviews.dto'
import { ReviewRepository } from '~/database/reviews/review.service'
import { ActivityType } from '~/const/activityLog'

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly activityLogService: ActivityLogService
  ) {}

  async find(options: GetReviewsInput = {}, lang = 'th'): Promise<Review[]> {
    const reviews = await this.reviewRepository.find(options)
    return ReviewFactory.createFromDatabase(reviews, lang)
  }

  async findById(id: string, lang = 'th'): Promise<Review> {
    const review = await this.reviewRepository.findById(id)
    return ReviewFactory.createFromDatabase(review, lang)
  }

  async findByUserId(userId: string, lang = 'th'): Promise<Review[]> {
    const reviews = await this.reviewRepository.findByUserId(userId)
    return ReviewFactory.createFromDatabase(reviews, lang)
  }

  async findByPlaceId(placeId: string, lang = 'th'): Promise<Review[]> {
    const reviews = await this.reviewRepository.findByPlaceId(placeId)
    return ReviewFactory.createFromDatabase(reviews, lang)
  }

  async create(review: CreateReviewInput, lang = 'th'): Promise<Review> {
    const reviewToSave = ReviewFactory.createToSave(review)
    const createdReview = await this.reviewRepository.create(reviewToSave)

    const formattedReview = ReviewFactory.createFromDatabase(
      createdReview,
      lang
    )

    await this.activityLogService.create(
      {
        action: ActivityType.WRITE_REVIEW,
        review: formattedReview.id,
        point: 100,
      },
      formattedReview.user.id
    )

    return formattedReview
  }

  async update(
    id: string,
    review: CreateReviewInput,
    lang = 'th'
  ): Promise<Review> {
    const reviewToSave = ReviewFactory.createToSave(review)
    const updatedReview = await this.reviewRepository.update(id, reviewToSave)
    return ReviewFactory.createFromDatabase(updatedReview, lang)
  }

  async delete(id: string) {
    return this.reviewRepository.delete(id)
  }
}
