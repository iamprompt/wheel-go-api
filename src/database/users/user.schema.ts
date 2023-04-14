import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import type { UserMetadata } from '../object/UserMetadataObject'
import { UserMetadataObject } from '../object/UserMetadataObject'

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  firstname: string

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

  @Prop()
  role: string

  @Prop({ type: UserMetadataObject })
  metadata: UserMetadata
}

export type UserDocument = HydratedDocument<
  User,
  {
    createdAt: Date
    updatedAt: Date
  }
>
export const UserSchema = SchemaFactory.createForClass(User)
