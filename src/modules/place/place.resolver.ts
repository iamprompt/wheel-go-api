import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceService } from './place.service'
import { PlaceFactory } from './place.factory'
import { Place } from './place.schema'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => Place)
  async place(@Args('id') id: string, @ActiveLang() lang: string) {
    const result = await this.placeService.findPlaceById(id)
    return PlaceFactory.createFromDatabase(result, lang)
  }

  @Query(() => [Place])
  async places(@ActiveLang() lang: string) {
    const result = await this.placeService.findAllPlaces()
    return PlaceFactory.createFromDatabase(result, lang)
  }

  @Mutation(() => Place)
  async createPlace(
    @Args('data') data: CreatePlaceInput,
    @ActiveLang() lang: string
  ) {
    const result = await this.placeService.createPlace(data)
    return PlaceFactory.createFromDatabase(result, lang)
  }
}
