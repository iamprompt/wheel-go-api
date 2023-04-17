import { Injectable } from '@nestjs/common'
import { FacilityFactory } from './facility.factory'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { FacilityRepository } from '~/database/facility/facility.services'

@Injectable()
export class FacilityService {
  constructor(private readonly facilityRepository: FacilityRepository) {}

  async find(lang = 'th') {
    const facilities = await this.facilityRepository.find()
    return FacilityFactory.createFromDatabase(facilities, lang)
  }

  async findById(id: string, lang = 'th') {
    const facility = await this.facilityRepository.findById(id)
    return FacilityFactory.createFromDatabase(facility, lang)
  }

  async create(data: CreateFacilityInput, lang = 'th') {
    const facilityToSave = FacilityFactory.createToSave(data)
    const facility = await this.facilityRepository.create(facilityToSave)
    return FacilityFactory.createFromDatabase(facility, lang)
  }

  async update(id: string, data: CreateFacilityInput, lang = 'th') {
    const facilityToUpdate = FacilityFactory.createToSave(data)
    const facility = await this.facilityRepository.update(id, facilityToUpdate)
    return FacilityFactory.createFromDatabase(facility, lang)
  }
}
