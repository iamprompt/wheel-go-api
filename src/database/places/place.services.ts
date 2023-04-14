import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { PlaceDocument } from './place.schema'
import { Place } from './place.schema'
import { CreatePlaceInput } from '~/modules/place/dto/createPlace.dto'

@Injectable()
export class PlaceDBService {
  constructor(
    @InjectModel(Place.name) private readonly PlaceModel: Model<PlaceDocument>
  ) {}

  async findAll(): Promise<Place[]> {
    return this.PlaceModel.find().exec()
  }

  async findPlaceById(id: string): Promise<PlaceDocument> {
    return this.PlaceModel.findById(id).exec()
  }

  async createPlace(data: CreatePlaceInput): Promise<PlaceDocument> {
    const createdPlace = new this.PlaceModel<Place>({
      type: data.type,
      name: data.name,
      address: data.address,
      location: {
        type: 'Point',
        coordinates: [data.location.lng, data.location.lat],
      },
      images: [],
      internalCode: data.internalCode,
      metadata: data.metadata,
      status: data.status,
    })
    return createdPlace.save()
  }
}
