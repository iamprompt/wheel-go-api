import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { RouteDocument } from './route.schema'
import { Route } from './route.schema'

@Injectable()
export class RouteRepository {
  constructor(
    @InjectModel(Route.name)
    private readonly RouteModel: Model<RouteDocument>
  ) {}

  PopulateOptions: Parameters<(typeof this.RouteModel)['populate']>['0'] = []

  async findAll(): Promise<RouteDocument[]> {
    return this.RouteModel.find().populate(this.PopulateOptions).exec()
  }

  async findOne(id: string): Promise<RouteDocument> {
    return (await this.RouteModel.findById(id))
      .populated(this.PopulateOptions)
      .exec()
  }

  async create(route: Route): Promise<RouteDocument> {
    const createdRoute = new this.RouteModel(route)
    return (await createdRoute.save()).populate(this.PopulateOptions)
  }

  async update(id: string, route: Route): Promise<RouteDocument> {
    const updatedRoute = await this.RouteModel.findByIdAndUpdate(id, route, {
      new: true,
    })

    if (!updatedRoute) {
      throw new Error('Route not found')
    }

    return updatedRoute.populate(this.PopulateOptions)
  }
}
