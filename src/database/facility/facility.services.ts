import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { FacilityDocument } from './facility.schema'
import { Facility } from './facility.schema'
import { GetFacilitiesInput } from '~/modules/facility/dto/getFacilities.dto'

@Injectable()
export class FacilityRepository {
  constructor(
    @InjectModel(Facility.name)
    private readonly FacilityModel: Model<FacilityDocument>
  ) {}

  FacilityPopulateOptions: Parameters<
    (typeof this.FacilityModel)['populate']
  >['0'] = [
    {
      path: 'parent',
      populate: {
        path: 'images',
      },
    },
  ]

  async find(options: GetFacilitiesInput): Promise<FacilityDocument[]> {
    return await this.FacilityModel.find({
      ...(options.keyword
        ? {
            $or: [
              { 'detail.th': { $regex: options.keyword, $options: 'i' } },
              { 'detail.en': { $regex: options.keyword, $options: 'i' } },
            ],
          }
        : {}),
      ...(options.types ? { type: { $in: options.types } } : {}),
      ...(options.exclude ? { _id: { $nin: options.exclude } } : {}),
      ...(options.location
        ? {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [options.location.lng, options.location.lat],
                },
                $maxDistance: options.radius || 10000,
                $minDistance: 0,
              },
            },
          }
        : {}),
    })
      .limit(options.limit || 1000)
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async findById(id: string): Promise<FacilityDocument> {
    return this.FacilityModel.findById(id)
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async create(data: Facility): Promise<FacilityDocument> {
    const facility = new this.FacilityModel(data)
    const saveResult = await facility.save()
    return saveResult.populate(this.FacilityPopulateOptions)
  }

  async update(id: string, data: Facility): Promise<FacilityDocument> {
    const updatedFacility = await this.FacilityModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )
    return updatedFacility.populate(this.FacilityPopulateOptions)
  }
}
