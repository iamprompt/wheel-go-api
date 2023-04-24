import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from '../user/user.schema'
import { Route } from './route.schema'
import { RouteService } from './route.service'
import { CreateRouteInput } from './dto/createRoute.dto'
import { GetRoutesInput } from './dto/getRoutes.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { CurrentUser } from '~/decorators/currentUser.decorator'

@Resolver()
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(() => [Route])
  async getRoutes(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetRoutesInput
  ): Promise<Route[]> {
    return this.routeService.find(options, lang)
  }

  @Query(() => Route)
  async getRouteById(
    @Args('id') id: string,
    @ActiveLang() lang: string
  ): Promise<Route> {
    return this.routeService.findById(id, lang)
  }

  @Query(() => [Route])
  @UseGuards(GqlAuthGuard)
  async getMyTracedRoutes(
    @ActiveLang() lang: string,
    @CurrentUser() user: User
  ): Promise<Route[]> {
    return this.routeService.findMyTracedRoutes(user.id, lang)
  }

  @Mutation(() => Route)
  async createRoute(
    @Args('data') data: CreateRouteInput,
    @ActiveLang() lang: string
  ): Promise<Route> {
    return this.routeService.create(data, lang)
  }

  @Mutation(() => Route)
  async updateRoute(
    @Args('id') id: string,
    @Args('data') data: CreateRouteInput,
    @ActiveLang() lang: string
  ): Promise<Route> {
    return this.routeService.update(id, data, lang)
  }

  @Mutation(() => Boolean)
  async deleteRoute(@Args('id') id: string): Promise<boolean> {
    try {
      await this.routeService.delete(id)
      return true
    } catch (error) {
      throw new Error(error)
    }
    return
  }
}
