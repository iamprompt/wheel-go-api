import { Query, Resolver } from '@nestjs/graphql'
import { User } from './user.schema'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return this.userService.getHello()
  }
}
