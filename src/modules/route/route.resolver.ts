import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Route } from './route.schema'
import { RouteService } from './route.service'
import { CreateRouteInput } from './dto/createRoute.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(() => [Route])
  async getRoutes(@ActiveLang() lang: string): Promise<Route[]> {
    return this.routeService.find(lang)
  }

  @Query(() => Route)
  async getRouteById(
    @Args('id') id: string,
    @ActiveLang() lang: string
  ): Promise<Route> {
    return this.routeService.findById(id, lang)
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
}
