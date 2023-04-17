import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { PlaceDocument } from './place.schema'
import { Place } from './place.schema'

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

  async findAllPlaces(): Promise<PlaceDocument[]> {
    return this.PlaceModel.find().populate(this.PlacePopulateOptions).exec()
  }

  async findPlaceById(id: string): Promise<PlaceDocument> {
    const place = await this.PlaceModel.findById(id)
      .populate(this.PlacePopulateOptions)
      .exec()

    if (!place) {
      throw new Error('Place not found')
    }

    return place
  }

  async createPlace(data: Place): Promise<PlaceDocument> {
    const createdPlace = new this.PlaceModel<Place>(data)
    return (await createdPlace.save()).populate(this.PlacePopulateOptions)
  }

  async updatePlace(id: string, data: Place): Promise<PlaceDocument> {
    const updatedPlace = await this.PlaceModel.findByIdAndUpdate(id, data, {
      new: true,
    })

    if (!updatedPlace) {
      throw new Error('Place not found')
    }

    return updatedPlace.populate(this.PlacePopulateOptions)
  }
}
