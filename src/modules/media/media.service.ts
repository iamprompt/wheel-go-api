import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import { HttpException, Injectable, Logger } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import sharp from 'sharp'
import { MediaFactory } from './media.factory'
import { Media } from './media.schema'
import { MediaDBService } from '~/database/media/media.services'

@Injectable()
export class MediaService {
  constructor(private readonly mediaService: MediaDBService) {}

  // async getMedia(): Promise<Media[]> {}

  async getMediaById(id: string): Promise<Media> {
    const media = await this.mediaService.findMediaById(id)

    if (!media) {
      throw new HttpException(`Media with id ${id} not found`, 404)
    }

    return MediaFactory.createMediaFromDatabase(media)
  }

  async uploadMedia(file: FileUpload): Promise<Media> {
    const { createReadStream, filename } = file

    Logger.log(`Uploading file: ${filename}`)

    // Read the file into a buffer
    const stream = createReadStream()
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('error', reject)
      stream.on('end', () => resolve(Buffer.concat(chunks)))
    })

    const metadata = await sharp(buffer).metadata()
    const { width, height, format, size } = metadata

    // Write the file to the uploads directory
    await writeFile(join(__dirname, '../../../uploads', filename), buffer)

    const media = MediaFactory.createMediaToSave(filename, {
      width,
      height,
      format,
      size,
    })

    const result = await this.mediaService.createMedia(media)

    return MediaFactory.createMediaFromDatabase(result)
  }
}
