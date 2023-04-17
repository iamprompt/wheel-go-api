import { MediaFactory } from '../media/media.factory'
import { PlaceFactory } from '../place/place.factory'
import { UserFactory } from '../user/user.factory'
import { LocationFactory } from '../object/factory/location.factory'
import { Announcement } from './announcement.schema'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import {
  Announcement as AnnouncementDB,
  AnnouncementDocument,
} from '~/database/announcements/announcement.schema'
import { createRefToSave } from '~/utils/factory'

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
      images: MediaFactory.createFromDatabase(announcements.images),
      place: PlaceFactory.createFromDatabase(announcements.place, language),
      location: LocationFactory.createFromDatabase(announcements.location),
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
      // @ts-expect-error Only ObjectId is required
      images: createRefToSave(data.images),
      // @ts-expect-error Only ObjectId is required
      place: createRefToSave(data.place),
      location: LocationFactory.createToSave(data.location),
      tags: data.tags,
      // @ts-expect-error Only _id is required
      user: data.user ? createRefToSave(data.user) : createRefToSave(userId),
      status: data.status,
    }
  }
}
