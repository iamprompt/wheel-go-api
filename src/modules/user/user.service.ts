import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { UserFactory } from './user.factory'
import { User } from './user.schema'
import { UserRepository } from '~/database/users/user.service'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(lang = 'th'): Promise<User[]> {
    const users = await this.userRepository.find()
    return UserFactory.createFromDatabase(users, lang)
  }

  async findById(id: string, lang = 'th'): Promise<User> {
    const user = await this.userRepository.findById(id)
    return UserFactory.createFromDatabase(user, lang)
  }

  async findByEmail(email: string, lang = 'th'): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    return UserFactory.createFromDatabase(user, lang)
  }

  async create(data: CreateUserInput, lang = 'th'): Promise<User> {
    const userToSave = UserFactory.createToSave(data)
    const user = await this.userRepository.create(userToSave)
    return UserFactory.createFromDatabase(user, lang)
  }

  async update(id: string, data: UpdateUserInput, lang = 'th'): Promise<User> {
    const userToUpdate = UserFactory.createToSave(data)
    const updateResult = await this.userRepository.update(id, userToUpdate)
    return UserFactory.createFromDatabase(updateResult, lang)
  }

  async addFavoritePlace(userId: string, placeId: string): Promise<User> {
    const user = await this.userRepository.addFavoritePlace(userId, placeId)
    return UserFactory.createFromDatabase(user)
  }

  async removeFavoritePlace(userId: string, placeId: string): Promise<User> {
    const user = await this.userRepository.removeFavoritePlace(userId, placeId)
    return UserFactory.createFromDatabase(user)
  }
}
