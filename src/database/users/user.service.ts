import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { UserDocument } from './user.schema'
import { User } from './user.schema'

@Injectable()
export class UserDBService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec()
  }
}
