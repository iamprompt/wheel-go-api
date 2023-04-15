import { Injectable } from '@nestjs/common'
import { AnnouncementRepository } from '~/database/announcements/announcement.service'

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository
  ) {}
}
