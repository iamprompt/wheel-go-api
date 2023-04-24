import { Injectable } from '@nestjs/common'
import { RouteFactory } from './route.factory'
import { CreateRouteInput } from './dto/createRoute.dto'
import { GetRoutesInput } from './dto/getRoutes.dto'
import { RouteRepository } from '~/database/routes/route.service'
import { ROUTE_TYPES } from '~/const/routeTypes'

@Injectable()
export class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}

  async find(options: GetRoutesInput = {}, lang = 'th') {
    const routes = await this.routeRepository.find(options)
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async findById(id: string, lang = 'th') {
    const route = await this.routeRepository.findById(id)
    return RouteFactory.createFromDatabase(route, lang)
  }

  async findMyTracedRoutes(userId: string, lang = 'th') {
    const routes = await this.routeRepository.findRoutesByUserId(
      userId,
      ROUTE_TYPES.TRACED
    )
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async create(route: CreateRouteInput, lang = 'th') {
    const routeToSave = RouteFactory.createToSave(route)
    const result = await this.routeRepository.create(routeToSave)
    return RouteFactory.createFromDatabase(result, lang)
  }

  async update(id: string, route: CreateRouteInput, lang = 'th') {
    const routeToSave = RouteFactory.createToSave(route)
    const result = await this.routeRepository.update(id, routeToSave)
    return RouteFactory.createFromDatabase(result, lang)
  }

  async delete(id: string) {
    return this.routeRepository.delete(id)
  }
}
