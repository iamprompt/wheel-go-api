import { Injectable } from '@nestjs/common'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceFactory } from './place.factory'
import { PlaceRepository } from '~/database/places/place.services'
import { PlaceDocument } from '~/database/places/place.schema'

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async findPlaceById(id: string): Promise<PlaceDocument> {
    return this.placeRepository.findPlaceById(id)
  }

  async createPlace(data: CreatePlaceInput): Promise<PlaceDocument> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.createPlace(place)
    return result
  }
}
