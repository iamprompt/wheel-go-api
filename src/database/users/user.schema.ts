import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import type { UserMetadata } from '../object/UserMetadataObject'
import { UserMetadataObject } from '../object/UserMetadataObject'

@Schema({ collection: 'users' })
export class User {
  @Prop()
  fistname: string

  @Prop()
  lastname: string

  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  email: string

  @Prop(Date)
  birthdate: Date

  @Prop({ type: UserMetadataObject })
  metadata: UserMetadata
}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)
