import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { ObjectId } from 'mongodb'
import type { ReviewDocument } from './review.schema'
import { Review } from './review.schema'
import { GetReviewsInput } from '~/modules/review/dto/getReviews.dto'

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

  async find(options: GetReviewsInput = {}): Promise<ReviewDocument[]> {
    return this.ReviewModel.find({
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.ReviewPopulateOptions)
      .exec()
  }

  async findById(id: string): Promise<ReviewDocument> {
    return this.ReviewModel.findById(id)
      .populate(this.ReviewPopulateOptions)
      .exec()
  }

  async countByUserId(userId: string): Promise<number> {
    return this.ReviewModel.countDocuments({ user: new ObjectId(userId) })
  }

  async findByPlaceId(placeId: string): Promise<ReviewDocument[]> {
    return this.ReviewModel.find({ place: new ObjectId(placeId) })
      .populate(this.ReviewPopulateOptions)
      .exec()
  }

  async findByUserId(userId: string): Promise<ReviewDocument[]> {
    return this.ReviewModel.find({ user: new ObjectId(userId) })
      .populate(this.ReviewPopulateOptions)
      .exec()
  }

  async create(review: Review): Promise<ReviewDocument> {
    const createdReview = new this.ReviewModel(review)
    return (await createdReview.save()).populate(this.ReviewPopulateOptions)
  }

  async update(id: string, review: Review): Promise<ReviewDocument> {
    const updatedReview = await this.ReviewModel.findByIdAndUpdate(id, review, {
      new: true,
    })

    if (!updatedReview) {
      throw new Error('Review not found')
    }

    return updatedReview.populate(this.ReviewPopulateOptions)
  }

  async delete(id: string): Promise<ReviewDocument> {
    const deletedReview = await this.ReviewModel.findByIdAndDelete(id)

    if (!deletedReview) {
      throw new Error('Review not found')
    }

    return deletedReview.populate(this.ReviewPopulateOptions)
  }
}
