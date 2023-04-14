import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { UserDocument } from './user.schema'
import { User } from './user.schema'

@Injectable()
export class UserDBService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec()
  }

  async findUserByEmail(email: string) {
    return this.UserModel.findOne({ email }).exec()
  }

  async createUser(data: User) {
    const newUser = new this.UserModel(data)
    return newUser.save()
  }

  async updateUser(id: string, data: Partial<User>): Promise<UserDocument> {
    const user = await this.UserModel.findById(id).exec()
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    const updateResult = await this.UserModel.findByIdAndUpdate(id, data).exec()

    return updateResult
  }
}
