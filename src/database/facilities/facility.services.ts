import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'
import type { FacilityDocument } from './facility.schema'
import { Facility } from './facility.schema'

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility.name)
    private readonly facilityModel: Model<FacilityDocument>
  ) {}

  async findAll(): Promise<Facility[]> {
    return this.facilityModel.find().exec()
  }
}
