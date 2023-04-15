import { MediaFactory } from '../media/media.factory'
import { Place } from './place.schema'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { Place as PlaceDB, PlaceDocument } from '~/database/places/place.schema'

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
      location: {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0],
      },
      images: place.images.map((image) =>
        MediaFactory.createFromDatabase(image)
      ),
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
      location: {
        type: 'Point',
        coordinates: [data.location.lng, data.location.lat],
      },
      // @ts-expect-error Only _id is required
      images: data.images.map((image) => ({ _id: image })),
      internalCode: data.internalCode,
      metadata: data.metadata,
      status: data.status,
    }
  }
}
