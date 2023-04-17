import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Route } from './route.schema'
import { RouteService } from './route.service'
import { CreateRouteInput } from './dto/createRoute.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(() => [Route])
  async routes(@ActiveLang() language: string) {
    return this.routeService.findAllRoutes(language)
  }

  @Query(() => Route)
  async route(@Args('id') id: string, @ActiveLang() language: string) {
    return this.routeService.findRouteById(id, language)
  }

  @Mutation(() => Route)
  async createRoute(
    @Args('data') data: CreateRouteInput,
    @ActiveLang() language: string
  ) {
    return this.routeService.createRoute(data, language)
  }

  @Mutation(() => Route)
  async updateRoute(
    @Args('id') id: string,
    @Args('data') data: CreateRouteInput,
    @ActiveLang() language: string
  ) {
    return this.routeService.updateRoute(id, data, language)
  }
}
