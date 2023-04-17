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

  ReviewPopulateOptions: Parameters<
    (typeof this.ReviewModel)['populate']
  >['0'] = [
    {
      path: 'place',
      populate: {
        path: 'images',
      },
    },
    {
      path: 'user',
    },
    {
      path: 'images',
    },
  ]

  async findAll(): Promise<ReviewDocument[]> {
    return this.ReviewModel.find().populate(this.ReviewPopulateOptions).exec()
  }

  async findOne(id: string): Promise<ReviewDocument> {
    return this.ReviewModel.findById(id)
      .populate(this.ReviewPopulateOptions)
      .exec()
  }

  async create(review: Review): Promise<ReviewDocument> {
    const createdReview = new this.ReviewModel(review)
    return (await createdReview.save()).populate(this.ReviewPopulateOptions)
  }
}
