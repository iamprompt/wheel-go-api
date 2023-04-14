import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { MediaDocument } from './media.schema'
import { Media } from './media.schema'

@Injectable()
export class MediaDBService {
  constructor(
    @InjectModel(Media.name) private readonly MediaModel: Model<MediaDocument>
  ) {}

  async findAll(): Promise<Media[]> {
    return this.MediaModel.find().exec()
  }

  async createMedia(media: Media): Promise<MediaDocument> {
    const createdMedia = new this.MediaModel(media)
    return createdMedia.save()
  }
}
