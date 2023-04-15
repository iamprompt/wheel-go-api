import { Media } from './media.schema'
import { Media as MediaDB, MediaDocument } from '~/database/media/media.schema'

type ReturnMediaOrArray<
  T extends MediaDocument | MediaDocument[] | undefined | null
> = T extends MediaDocument[]
  ? Media[]
  : T extends MediaDocument
  ? Media
  : undefined

export class MediaFactory {
  static createFromDatabase<
    T extends MediaDocument | MediaDocument[] | undefined | null
  >(data: T): ReturnMediaOrArray<T> {
    if (!data) {
      return undefined
    }

    if (Array.isArray(data)) {
      return <ReturnMediaOrArray<T>>(
        data.map((d) => MediaFactory.createFromDatabase(d))
      )
    }

    return <ReturnMediaOrArray<T>>{
      id: data._id.toString(),
      filename: data.filename,
      filesize: data.filesize,
      height: data.height,
      mimetype: data.mimetype,
      url: `http://localhost:3000${data.path}`,
      width: data.width,
    }
  }

  static createToSave(
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
