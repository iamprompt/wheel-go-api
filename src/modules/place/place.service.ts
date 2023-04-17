import { Injectable } from '@nestjs/common'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceFactory } from './place.factory'
import { Place } from './place.schema'
import { PlaceRepository } from '~/database/places/place.services'

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async find(lang = 'th'): Promise<Place[]> {
    const places = await this.placeRepository.find()
    return PlaceFactory.createFromDatabase(places, lang)
  }

  async findById(id: string, lang = 'th'): Promise<Place> {
    const place = await this.placeRepository.findById(id)
    return PlaceFactory.createFromDatabase(place, lang)
  }

  async create(data: CreatePlaceInput, lang = 'th'): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.create(place)
    return PlaceFactory.createFromDatabase(result, lang)
  }

  async update(
    id: string,
    data: CreatePlaceInput,
    lang = 'th'
  ): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.update(id, place)
    return PlaceFactory.createFromDatabase(result, lang)
  }
}
