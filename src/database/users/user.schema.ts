import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { HydratedDocument } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'
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
  birthdate?: Date

  @Prop()
  role: string

  @Prop({ type: UserMetadataObject })
  metadata?: UserMetadata
}

export type UserDocument = HydratedDocument<
  User,
  {
    createdAt: Date
    updatedAt: Date
  }
>

const UserSchema = SchemaFactory.createForClass(User)
UserSchema.pre<UserDocument>('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, genSaltSync())
  }

  next()
})

export { UserSchema }
