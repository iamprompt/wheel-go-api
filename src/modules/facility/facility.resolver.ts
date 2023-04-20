import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FacilityService } from './facility.service'
import { Facility } from './facility.schema'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { GetFacilitiesInput } from './dto/getFacilities.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) {}

  @Query(() => [Facility])
  async getFacilities(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetFacilitiesInput
  ) {
    return await this.facilityService.find(options, lang)
  }

  @Query(() => Facility)
  async getFacilityById(
    @Args('id') id: string,
    @ActiveLang() lang: string
  ): Promise<Facility> {
    return await this.facilityService.findById(id, lang)
  }

  @Mutation(() => Facility)
  async createFacility(
    @Args('data') data: CreateFacilityInput,
    @ActiveLang() lang: string
  ) {
    return await this.facilityService.create(data, lang)
  }

  @Mutation(() => Facility)
  async updateFacility(
    @Args('id') id: string,
    @Args('data') data: CreateFacilityInput,
    @ActiveLang() lang: string
  ) {
    return await this.facilityService.update(id, data, lang)
  }
}
