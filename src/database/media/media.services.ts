import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { MediaDocument } from './media.schema'
import { Media } from './media.schema'

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>
  ) {}

  async findAll(): Promise<Media[]> {
    return this.mediaModel.find().exec()
  }
}
