import { Query, Resolver } from '@nestjs/graphql'
import { Logger, UseGuards } from '@nestjs/common'
import { User } from './user.schema'
import { UserService } from './user.service'
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
  @HasRoles('ADMIN')
  me(@CurrentUser() user: User) {
    Logger.log(user)

    return user
  }
}
