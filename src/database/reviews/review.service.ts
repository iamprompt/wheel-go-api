import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { ReviewDocument } from './review.schema'
import { Review } from './review.schema'

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name)
    private readonly ReviewModel: Model<ReviewDocument>
  ) {}

  async findAll(): Promise<ReviewDocument[]> {
    return this.ReviewModel.find().exec()
  }

  async findOne(id: string): Promise<ReviewDocument> {
    return this.ReviewModel.findById(id).exec()
  }

  async create(review: Review): Promise<ReviewDocument> {
    const createdReview = new this.ReviewModel(review)
    return createdReview.save()
  }
}
