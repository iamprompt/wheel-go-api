import { Injectable } from '@nestjs/common'
import { RouteFactory } from './route.factory'
import { CreateRouteInput } from './dto/createRoute.dto'
import { RouteRepository } from '~/database/routes/route.service'

@Injectable()
export class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}

  async findAllRoutes(lang = 'th') {
    const routes = await this.routeRepository.findAll()
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async findRouteById(id: string, lang = 'th') {
    const route = await this.routeRepository.findOne(id)
    return RouteFactory.createFromDatabase(route, lang)
  }

  async createRoute(route: CreateRouteInput, lang = 'th') {
    const routeToSave = RouteFactory.createToSave(route)
    const result = await this.routeRepository.create(routeToSave)

    return RouteFactory.createFromDatabase(result, lang)
  }

  async updateRoute(id: string, route: CreateRouteInput, lang = 'th') {
    const routeToSave = RouteFactory.createToSave(route)
    const result = await this.routeRepository.update(id, routeToSave)

    return RouteFactory.createFromDatabase(result, lang)
  }
}
