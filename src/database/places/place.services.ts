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

  async findAllPlaces(): Promise<PlaceDocument[]> {
    return this.PlaceModel.find().exec()
  }

  async findPlaceById(id: string): Promise<PlaceDocument> {
    const place = await this.PlaceModel.findById(id).populate('images').exec()

    if (!place) {
      throw new Error('Place not found')
    }

    return place
  }

  async createPlace(data: Place): Promise<PlaceDocument> {
    const createdPlace = new this.PlaceModel<Place>(data)
    return createdPlace.save()
  }
}
