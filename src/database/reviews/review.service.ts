import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { ReviewDocument } from './review.schema'
import { Review } from './review.schema'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec()
  }
}
