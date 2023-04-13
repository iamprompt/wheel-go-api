import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './user.schema'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return this.userService.getHello()
  }

  @Mutation(() => Boolean)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return this.userService.login(email, password)
  }
}
