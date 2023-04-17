import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { FacilityDocument } from './facility.schema'
import { Facility } from './facility.schema'

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

  async findAllFacilities(): Promise<FacilityDocument[]> {
    return await this.FacilityModel.find()
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async findFacilityById(id: string): Promise<FacilityDocument> {
    return this.FacilityModel.findById(id)
      .populate(this.FacilityPopulateOptions)
      .exec()
  }

  async createFacility(data: Facility): Promise<FacilityDocument> {
    const facility = new this.FacilityModel(data)
    const saveResult = await facility.save()
    return saveResult.populate(this.FacilityPopulateOptions)
  }

  async updateFacility(id: string, data: Facility): Promise<FacilityDocument> {
    const updatedFacility = await this.FacilityModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )
    return updatedFacility.populate(this.FacilityPopulateOptions)
  }
}
