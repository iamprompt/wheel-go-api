import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { PlaceDocument } from './place.schema'
import { Place } from './place.schema'

@Injectable()
export class PlaceDBService {
  constructor(
    @InjectModel(Place.name) private readonly placeModel: Model<PlaceDocument>
  ) {}

  async findAll(): Promise<Place[]> {
    return this.placeModel.find().exec()
  }
}
