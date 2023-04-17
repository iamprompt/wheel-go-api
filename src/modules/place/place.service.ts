import { Injectable } from '@nestjs/common'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceFactory } from './place.factory'
import { Place } from './place.schema'
import { PlaceRepository } from '~/database/places/place.services'

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async findAllPlaces(lang = 'th'): Promise<Place[]> {
    const places = await this.placeRepository.findAllPlaces()
    return PlaceFactory.createFromDatabase(places, lang)
  }

  async findPlaceById(id: string, lang = 'th'): Promise<Place> {
    const place = await this.placeRepository.findPlaceById(id)
    return PlaceFactory.createFromDatabase(place, lang)
  }

  async createPlace(data: CreatePlaceInput, lang = 'th'): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.createPlace(place)
    return PlaceFactory.createFromDatabase(result, lang)
  }

  async updatePlace(
    id: string,
    data: CreatePlaceInput,
    lang = 'th'
  ): Promise<Place> {
    const place = PlaceFactory.createToSave(data)
    const result = await this.placeRepository.updatePlace(id, place)
    return PlaceFactory.createFromDatabase(result, lang)
  }
}
