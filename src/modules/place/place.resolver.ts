import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceService } from './place.service'
import { Place } from './place.schema'
import { GetPlacesInput } from './dto/getPlaces.dto'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => [Place])
  async getPlaces(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetPlacesInput
  ) {
    return this.placeService.find(options, lang)
  }

  @Query(() => Place)
  async getPlaceById(@Args('id') id: string, @ActiveLang() lang: string) {
    return this.placeService.findById(id, lang)
  }

  @Mutation(() => Place)
  async createPlace(
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string
  ) {
    return this.placeService.create(data, lang)
  }

  @Mutation(() => Place)
  async updatePlace(
    @Args('id') id: string,
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string
  ) {
    return this.placeService.update(id, data, lang)
  }
}
