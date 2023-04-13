import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { AnnouncementDocument } from './announcement.schema'
import { Announcement } from './announcement.schema'

@Injectable()
export class AnnouncementDBService {
  constructor(
    @InjectModel(Announcement.name)
    private readonly announcementModel: Model<AnnouncementDocument>
  ) {}

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().exec()
  }
}
