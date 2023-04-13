import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'

@Schema({ collection: 'media' })
export class Media {
  @Prop()
  filename: string

  @Prop()
  mimetype: string

  @Prop()
  filesize: number

  @Prop()
  width: number

  @Prop()
  height: number

  @Prop()
  path: string
}

export type MediaDocument = HydratedDocument<Media>
export const MediaSchema = SchemaFactory.createForClass(Media)
