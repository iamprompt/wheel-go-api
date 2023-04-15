import { Injectable } from '@nestjs/common'
import { RouteRepository } from '~/database/routes/route.service'

@Injectable()
export class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}
}
