import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { PlaceDocument } from './place.schema'
import { Place } from './place.schema'
import { GetPlacesInput } from '~/modules/place/dto/getPlaces.dto'

@Injectable()
export class PlaceRepository {
  constructor(
    @InjectModel(Place.name) private readonly PlaceModel: Model<PlaceDocument>
  ) {}

  PlacePopulateOptions: Parameters<(typeof this.PlaceModel)['populate']>['0'] =
    [
      {
        path: 'images',
      },
    ]

  async find(options: GetPlacesInput = {}): Promise<PlaceDocument[]> {
    Logger.log(options)
    return this.PlaceModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'name.th': { $regex: options.keyword, $options: 'i' } },
              { 'name.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.types ? { type: { $in: options.types } } : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
      ...(options.location
        ? {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [options.location.lng, options.location.lat],
                },
                $maxDistance: options.radius || 10000,
                $minDistance: 0,
              },
            },
          }
        : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.PlacePopulateOptions)
      .exec()
  }

  async findById(id: string): Promise<PlaceDocument> {
    const place = await this.PlaceModel.findById(id)
      .populate(this.PlacePopulateOptions)
      .exec()

    if (!place) {
      throw new Error('Place not found')
    }

    return place
  }

  async create(data: Place): Promise<PlaceDocument> {
    const createdPlace = new this.PlaceModel<Place>(data)
    return (await createdPlace.save()).populate(this.PlacePopulateOptions)
  }

  async update(id: string, data: Place): Promise<PlaceDocument> {
    const updatedPlace = await this.PlaceModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!updatedPlace) {
      throw new Error('Place not found')
    }

    return updatedPlace.populate(this.PlacePopulateOptions)
  }
}
