import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { UserFactory } from './user.factory'
import { UserRepository } from '~/database/users/user.service'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers() {
    const users = await this.userRepository.findAllUsers()
    return UserFactory.createFromDatabase(users)
  }

  async createUser(data: CreateUserInput) {
    return this.userRepository.createUser(data)
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const updateResult = await this.userRepository.updateUser(id, data)
    return UserFactory.createFromDatabase(updateResult)
  }
}
