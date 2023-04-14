import { Media } from './media.schema'
import { Media as MediaDB, MediaDocument } from '~/database/media/media.schema'

export class MediaFactory {
  static createMediaFromDatabase({
    _id,
    filename,
    filesize,
    height,
    mimetype,
    path,
    width,
  }: MediaDocument): Media {
    return {
      id: _id.toString(),
      filename,
      filesize,
      height,
      mimetype,
      url: `http://localhost:3000${path}`,
      width,
    }
  }

  static createMediaToSave(
    filename: string,
    {
      width,
      height,
      format,
      size,
    }: { width: number; height: number; format: string; size: number }
  ): MediaDB {
    return {
      filename,
      filesize: size,
      height,
      mimetype: `image/${format}`,
      path: `/uploads/${filename}`,
      width,
    }
  }
}
