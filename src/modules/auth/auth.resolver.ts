import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResponse } from './auth.schema'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      return new UnauthorizedException()
    }
    return this.authService.sign(user)
  }

  @Mutation(() => AuthResponse)
  async refresh(@Args('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken)
  }
}
