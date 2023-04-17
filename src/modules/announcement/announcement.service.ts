import { Injectable } from '@nestjs/common'
import { AnnouncementFactory } from './announcement.factory'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import { AnnouncementRepository } from '~/database/announcements/announcement.service'

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository
  ) {}

  async findAllAnnouncements(lang = 'th') {
    const announcements =
      await this.announcementRepository.findAllAnnouncements()

    return AnnouncementFactory.createFromDatabase(announcements, lang)
  }

  async findAnnouncementById(id: string, lang = 'th') {
    const announcement = await this.announcementRepository.findAnnouncementById(
      id
    )
    return AnnouncementFactory.createFromDatabase(announcement, lang)
  }

  async createAnnouncement(
    announcement: CreateAnnouncementInput,
    userId: string,
    lang = 'th'
  ) {
    const announcementToSave = AnnouncementFactory.createToSave(
      announcement,
      userId
    )
    const result = await this.announcementRepository.createAnnouncement(
      announcementToSave
    )

    return AnnouncementFactory.createFromDatabase(result, lang)
  }

  async updateAnnouncement(
    id: string,
    announcement: CreateAnnouncementInput,
    userId?: string,
    lang = 'th'
  ) {
    const announcementToSave = AnnouncementFactory.createToSave(
      announcement,
      userId
    )
    const result = await this.announcementRepository.updateAnnouncement(
      id,
      announcementToSave
    )

    return AnnouncementFactory.createFromDatabase(result, lang)
  }
}
