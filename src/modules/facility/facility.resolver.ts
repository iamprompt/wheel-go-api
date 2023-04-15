import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FacilityService } from './facility.service'
import { Facility } from './facility.schema'
import { CreateFacilityInput } from './dto/createFacility.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class FacilityResolver {
  constructor(private readonly facilityService: FacilityService) {}

  @Query(() => [Facility])
  async facilities(@ActiveLang() language: string) {
    return await this.facilityService.findAllFacilities(language)
  }

  @Query(() => Facility)
  async facility(@Args('id') id: string, @ActiveLang() language: string) {
    return await this.facilityService.findFacilityById(id, language)
  }

  @Mutation(() => Facility)
  async createFacility(
    @Args('data') data: CreateFacilityInput,
    @ActiveLang() language: string
  ) {
    return await this.facilityService.createFacility(data, language)
  }
}
