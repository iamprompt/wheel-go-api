import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { UserFactory } from './user.factory'
import { UserDBService } from '~/database/users/user.service'

@Injectable()
export class UserService {
  constructor(private readonly userService: UserDBService) {}

  getHello(): string {
    return 'Hello World! from UserService'
  }

  async createUser(data: CreateUserInput) {
    return this.userService.createUser(data)
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const updateResult = await this.userService.updateUser(id, data)
    return UserFactory.createFromDatabase(updateResult)
  }
}
