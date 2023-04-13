import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { RouteDocument } from './route.schema'
import { Route } from './route.schema'

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(Route.name)
    private readonly routeModel: Model<RouteDocument>
  ) {}

  async findAll(): Promise<Route[]> {
    return this.routeModel.find().exec()
  }
}
