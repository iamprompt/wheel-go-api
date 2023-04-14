import { User } from './user.schema'
import { UserDocument as UserDB } from '~/database/users/user.schema'

export class UserFactory {
  static createFromDatabase(user: UserDB): User {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
