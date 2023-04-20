import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import { ObjectId } from 'mongodb'
import type { RouteDocument } from './route.schema'
import { Route } from './route.schema'
import { GetRoutesInput } from '~/modules/route/dto/getRoutes.dto'

@Injectable()
export class RouteRepository {
  constructor(
    @InjectModel(Route.name)
    private readonly RouteModel: Model<RouteDocument>
  ) {}

  PopulateOptions: Parameters<(typeof this.RouteModel)['populate']>['0'] = []

  async find(options: GetRoutesInput): Promise<RouteDocument[]> {
    return this.RouteModel.find({
      // Find reviews that match the origin object id and destination object id
      $or: [
        {
          origin: new ObjectId(options.origin),
          destination: new ObjectId(options.destination),
        },
        {
          origin: new ObjectId(options.destination),
          destination: new ObjectId(options.origin),
        },
      ],
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.PopulateOptions)
      .exec()
  }

  async findById(id: string): Promise<RouteDocument> {
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
