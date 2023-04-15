import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { MediaDocument } from './media.schema'
import { Media } from './media.schema'

@Injectable()
export class MediaRepository {
  constructor(
    @InjectModel(Media.name) private readonly MediaModel: Model<MediaDocument>
  ) {}

  async findAllMedia(): Promise<MediaDocument[]> {
    return this.MediaModel.find().exec()
  }

  async findMediaById(id: string): Promise<MediaDocument> {
    return this.MediaModel.findById(id).exec()
  }

  async createMedia(media: Media): Promise<MediaDocument> {
    const createdMedia = new this.MediaModel(media)
    return createdMedia.save()
  }
}
