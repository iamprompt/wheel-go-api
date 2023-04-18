import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './user.schema'
import { UserService } from './user.service'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'

@Resolver(() => User)
// @UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  me() {
    // @CurrentUser() user: User
    return {}
  }

  @Query(() => [User])
  // @HasRoles('ADMIN')
  async getUsers() {
    return this.userService.find()
  }

  @Query(() => User)
  // @HasRoles('ADMIN')
  async getUserById(@Args('id') id: string) {
    return this.userService.findById(id)
  }

  @Mutation(() => Boolean)
  // @HasRoles('ADMIN')
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { nullable: true }) id: string,
    @Args('data') data: UpdateUserInput
    // @CurrentUser() user: User
  ) {
    return this.userService.update(id, data)
    // return this.userService.update(id || user.id, data)
  }
}
