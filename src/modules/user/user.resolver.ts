import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from './user.schema'
import { UserService } from './user.service'
import { CreateUserInput } from './dto/createUser.dto'
import { UpdateUserInput } from './dto/updateUser.dto'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { RolesGuard } from '~/guards/RolesGuard'
import { CurrentUser } from '~/decorators/currentUser.decorator'

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user
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

  @Mutation(() => User)
  // @HasRoles('ADMIN')
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { nullable: true }) id: string,
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: User
  ) {
    return this.userService.update(user.id, data)
  }

  @Mutation(() => User)
  async addFavoritePlace(
    @Args('placeId') placeId: string,
    @CurrentUser() user: User
  ): Promise<User> {
    return this.userService.addFavoritePlace(user.id, placeId)
  }

  @Mutation(() => User)
  async removeFavoritePlace(
    @Args('placeId') placeId: string,
    @CurrentUser() user: User
  ): Promise<User> {
    return this.userService.removeFavoritePlace(user.id, placeId)
  }

  @Query(() => Boolean)
  async isFavoritePlace(
    @Args('placeId') placeId: string,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return this.userService.isFavoritePlace(user.id, placeId)
  }
}
