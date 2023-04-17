import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceService } from './place.service'
import { Place } from './place.schema'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => Place)
  async place(@Args('id') id: string, @ActiveLang() lang: string) {
    return this.placeService.findPlaceById(id, lang)
  }

  @Query(() => [Place])
  async places(@ActiveLang() lang: string) {
    return this.placeService.findAllPlaces(lang)
  }

  @Mutation(() => Place)
  async createPlace(
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string
  ) {
    return this.placeService.createPlace(data, lang)
  }

  @Mutation(() => Place)
  async updatePlace(
    @Args('id') id: string,
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string
  ) {
    return this.placeService.updatePlace(id, data, lang)
  }
}
