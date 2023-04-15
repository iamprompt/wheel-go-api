import { User } from './user.schema'
import { UserDocument } from '~/database/users/user.schema'

type ReturnUserOrArray<
  T extends UserDocument | UserDocument[] | undefined | null
> = T extends UserDocument[]
  ? User[]
  : T extends UserDocument
  ? User
  : undefined

export class UserFactory {
  static createFromDatabase<
    T extends UserDocument | UserDocument[] | undefined | null
  >(user: T): ReturnUserOrArray<T> {
    if (!user) {
      return undefined
    }

    if (Array.isArray(user)) {
      return <ReturnUserOrArray<T>>(
        user.map((u) => UserFactory.createFromDatabase(u))
      )
    }

    return <ReturnUserOrArray<T>>{
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
