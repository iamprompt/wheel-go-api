import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Logger } from '@nestjs/common'
import sharp from 'sharp'
import { Media } from './media.schema'
import { MediaFactory } from './media.factory'
import { MediaDBService } from '~/database/media/media.services'

@Resolver()
export class MediaResolver {
  constructor(private readonly mediaService: MediaDBService) {}

  @Query(() => [Media])
  async media(): Promise<Media[]> {
    return []
  }

  @Query(() => Media)
  async mediaById(): Promise<Media> {
    return {
      filename: 'test.jpg',
      filesize: 123,
      height: 123,
      mimetype: 'image/jpeg',
      url: 'http://localhost:3000/media/test.jpg',
      width: 123,
    }
  }

  @Mutation(() => Media)
  async uploadMedia(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload
  ): Promise<Media> {
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
