import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { UserDocument } from './user.schema'
import { User } from './user.schema'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async find(): Promise<UserDocument[]> {
    return this.UserModel.find().exec()
  }

  async findById(id: string): Promise<UserDocument> {
    return this.UserModel.findById(id).exec()
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email }).exec()
  }

  async create(data: User) {
    const newUser = new this.UserModel(data)
    return newUser.save()
  }

  async update(id: string, data: Partial<User>): Promise<UserDocument> {
    const user = await this.UserModel.findById(id).exec()
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const updateResult = await this.UserModel.findByIdAndUpdate(id, data).exec()

    return updateResult
  }
}
