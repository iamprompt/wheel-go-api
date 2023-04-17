import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { AnnouncementDocument } from './announcement.schema'
import { Announcement } from './announcement.schema'

@Injectable()
export class AnnouncementRepository {
  constructor(
    @InjectModel(Announcement.name)
    private readonly AnnouncementModel: Model<AnnouncementDocument>
  ) {}

  async findAllAnnouncements(): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find()
      .populate(['user', 'place', 'images'])
      .exec()
  }

  async findAnnouncementById(id: string): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findById(id)
      .populate(['user', 'place', 'images'])
      .exec()
  }

  async createAnnouncement(
    announcement: Announcement
  ): Promise<AnnouncementDocument> {
    const createdAnnouncement = new this.AnnouncementModel(announcement)
    const saveResult = await createdAnnouncement.save()

    return saveResult.populate(['user', 'place', 'images'])
  }

  async updateAnnouncement(
    id: string,
    announcement: Announcement
  ): Promise<AnnouncementDocument> {
    const updatedAnnouncement = await this.AnnouncementModel.findByIdAndUpdate(
      id,
      announcement,
      { new: true }
    )

    return updatedAnnouncement.populate(['user', 'place', 'images'])
  }
}
