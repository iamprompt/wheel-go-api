import { MediaFactory } from '../media/media.factory'
import { LocationFactory } from '../object/factory/location.factory'
import { Place } from './place.schema'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { Place as PlaceDB, PlaceDocument } from '~/database/places/place.schema'
import { createRefToSave } from '~/utils/factory'

type ReturnPlaceOrArray<
  T extends PlaceDocument | PlaceDocument[] | undefined | null
> = T extends PlaceDocument[]
  ? Place[]
  : T extends PlaceDocument
  ? Place
  : undefined

export class PlaceFactory {
  static createFromDatabase<
    T extends PlaceDocument | PlaceDocument[] | undefined | null
  >(place: T, language = 'th'): ReturnPlaceOrArray<T> {
    if (!place) {
      return undefined
    }

    if (Array.isArray(place)) {
      return <ReturnPlaceOrArray<T>>(
        place.map((p) => PlaceFactory.createFromDatabase(p, language))
      )
    }

    return <ReturnPlaceOrArray<T>>{
      id: place._id.toString(),
      type: place.type,
      name: place.name[language],
      address: place.address[language],
      location: LocationFactory.createFromDatabase(place.location),
      images: MediaFactory.createFromDatabase(place.images),
      internalCode: place.internalCode,
      metadata: place.metadata,
      status: place.status,
    }
  }

  static createToSave(data: CreatePlaceInput): PlaceDB {
    return {
      type: data.type,
      name: data.name,
      address: data.address,
      location: LocationFactory.createToSave(data.location),
      // @ts-expect-error Only ObjectId is required
      images: createRefToSave(data.images),
      internalCode: data.internalCode,
      metadata: data.metadata,
      status: data.status,
    }
  }
}
