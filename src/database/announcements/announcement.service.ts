import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { AnnouncementDocument } from './announcement.schema'
import { Announcement } from './announcement.schema'
import { GetAnnouncementsInput } from '~/modules/announcement/dto/getAnnouncements.dto'

@Injectable()
export class AnnouncementRepository {
  constructor(
    @InjectModel(Announcement.name)
    private readonly AnnouncementModel: Model<AnnouncementDocument>
  ) {}

  async find(
    options: GetAnnouncementsInput = {}
  ): Promise<AnnouncementDocument[]> {
    return this.AnnouncementModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'title.th': { $regex: options.keyword, $options: 'i' } },
              { 'title.en': { $regex: options.keyword, $options: 'i' } },
              { 'content.en': { $regex: options.keyword, $options: 'i' } },
              { 'content.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.tags ? { type: { $in: options.tags } } : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
      ...(options.location
        ? {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [options.location.lng, options.location.lat],
                },
                $maxDistance: options.radius || 10000,
                $minDistance: 0,
              },
            },
          }
        : {}),
    })
      .limit(options.limit || 1000)
      .populate(['user', 'place', 'images'])
      .exec()
  }

  async findById(id: string): Promise<AnnouncementDocument> {
    return this.AnnouncementModel.findById(id)
      .populate(['user', 'place', 'images'])
      .exec()
  }

  async create(announcement: Announcement): Promise<AnnouncementDocument> {
    const createdAnnouncement = new this.AnnouncementModel(announcement)
    const saveResult = await createdAnnouncement.save()

    return saveResult.populate(['user', 'place', 'images'])
  }

  async update(
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
