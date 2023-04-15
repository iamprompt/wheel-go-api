import { Types } from 'mongoose'
import { MediaFactory } from '../media/media.factory'
import { PlaceFactory } from '../place/place.factory'
import { UserFactory } from '../user/user.factory'
import { Announcement } from './announcement.schema'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import {
  Announcement as AnnouncementDB,
  AnnouncementDocument,
} from '~/database/announcements/announcement.schema'

type ReturnAnnouncementOrArray<
  T extends AnnouncementDocument | AnnouncementDocument[] | undefined | null
> = T extends AnnouncementDocument[]
  ? Announcement[]
  : T extends AnnouncementDocument
  ? Announcement
  : undefined

export class AnnouncementFactory {
  static createFromDatabase<
    T extends AnnouncementDocument | AnnouncementDocument[] | undefined | null
  >(announcements: T, language = 'th'): ReturnAnnouncementOrArray<T> {
    if (!announcements) {
      return undefined
    }

    if (Array.isArray(announcements)) {
      return <ReturnAnnouncementOrArray<T>>(
        announcements.map((announcement) =>
          AnnouncementFactory.createFromDatabase(announcement, language)
        )
      )
    }

    return <ReturnAnnouncementOrArray<T>>{
      id: announcements._id.toString(),
      title: announcements.title[language],
      content: announcements.content[language],
      metadata: announcements.metadata,
      images: announcements.images.map((image) =>
        MediaFactory.createFromDatabase(image)
      ),
      place: PlaceFactory.createFromDatabase(announcements.place, language),
      location:
        announcements.location && announcements.location.coordinates
          ? {
              lat: announcements.location.coordinates[1],
              lng: announcements.location.coordinates[0],
            }
          : undefined,
      tags: announcements.tags,
      user: UserFactory.createFromDatabase(announcements.user),
      status: announcements.status,
    }
  }

  static createToSave(
    data: CreateAnnouncementInput,
    userId: string
  ): AnnouncementDB {
    return {
      title: data.title,
      content: data.content,
      metadata: data.metadata,
      // @ts-expect-error Only _id is required
      images: data.images.map((image) => new Types.ObjectId(image)),
      // @ts-expect-error Only _id is required
      place: data.place ? new Types.ObjectId(data.place) : undefined,
      location: data.location
        ? {
            type: 'Point',
            coordinates: [data.location.lng, data.location.lat],
          }
        : undefined,
      tags: data.tags,
      // @ts-expect-error Only _id is required
      user: new Types.ObjectId(userId),
      status: data.status,
    }
  }
}
