import { Injectable } from '@nestjs/common'
import { FacilityRepository } from '~/database/facilities/facility.services'

@Injectable()
export class FacilityService {
  constructor(private readonly facilityRepository: FacilityRepository) {}
}
