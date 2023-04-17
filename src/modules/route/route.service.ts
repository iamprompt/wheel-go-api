import { Injectable } from '@nestjs/common'
import { RouteFactory } from './route.factory'
import { CreateRouteInput } from './dto/createRoute.dto'
import { RouteRepository } from '~/database/routes/route.service'

@Injectable()
export class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}

  async find(lang = 'th') {
    const routes = await this.routeRepository.find()
    return RouteFactory.createFromDatabase(routes, lang)
  }

  async findById(id: string, lang = 'th') {
    const route = await this.routeRepository.findById(id)
    return RouteFactory.createFromDatabase(route, lang)
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
}
