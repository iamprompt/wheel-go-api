import { MediaFactory } from '../media/media.factory'
import { Place } from './place.schema'
import { PlaceDocument } from '~/database/places/place.schema'

export class PlaceFactory {
  static createFromDatabase(place: PlaceDocument, language = 'th'): Place {
    return {
      id: place._id.toString(),
      type: place.type,
      name: place.name[language],
      address: place.address[language],
      location: {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0],
      },
      images: place.images.map((image) =>
        MediaFactory.createMediaFromDatabase(image)
      ),
      internalCode: place.internalCode,
      metadata: place.metadata,
      status: place.status,
    }
  }
}
