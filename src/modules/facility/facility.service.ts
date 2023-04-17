import { Injectable } from '@nestjs/common'
import { FacilityFactory } from './facility.factory'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { FacilityRepository } from '~/database/facility/facility.services'

@Injectable()
export class FacilityService {
  constructor(private readonly facilityRepository: FacilityRepository) {}

  async findAllFacilities(language = 'th') {
    const facilities = await this.facilityRepository.findAllFacilities()
    return FacilityFactory.createFromDatabase(facilities, language)
  }

  async findFacilityById(id: string, language = 'th') {
    const facility = await this.facilityRepository.findFacilityById(id)
    return FacilityFactory.createFromDatabase(facility, language)
  }

  async createFacility(data: CreateFacilityInput, language = 'th') {
    const facility = await this.facilityRepository.createFacility(
      FacilityFactory.createToSave(data)
    )
    return FacilityFactory.createFromDatabase(facility, language)
  }

  async updateFacility(id: string, data: CreateFacilityInput, language = 'th') {
    const facility = await this.facilityRepository.updateFacility(
      id,
      FacilityFactory.createToSave(data)
    )
    return FacilityFactory.createFromDatabase(facility, language)
  }
}
