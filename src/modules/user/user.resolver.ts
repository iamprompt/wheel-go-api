import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Logger, UseGuards } from '@nestjs/common'
import { User } from './user.schema'
import { UserService } from './user.service'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { RolesGuard } from '~/guards/RolesGuard'
import { HasRoles } from '~/decorators/hasRoles.decorator'

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return this.userService.getHello()
  }

  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => Boolean)
  @HasRoles('ADMIN')
  async createUser(@Args('data') data: CreateUserInput) {
    Logger.log(data)

    return this.userService.createUser(data)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { nullable: true }) id: string,
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: User
  ) {
    return this.userService.updateUser(id || user.id, data)
  }
}
