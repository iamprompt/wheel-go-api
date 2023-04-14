import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Logger } from '@nestjs/common'
import { CreatePlaceInput } from './dto/createPlace.dto'
import { PlaceService } from './place.service'
import { PlaceFactory } from './place.factory'
import { Place } from './place.schema'
import { getActiveLanguage } from '~/utils/i18n'

@Resolver()
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => Place)
  async place(@Args('id') id: string, @Context() context: any) {
    Logger.log(context.req.headers)

    const result = await this.placeService.findPlaceById(id)
    return PlaceFactory.createFromDatabase(
      result,
      getActiveLanguage(context.req)
    )
  }

  @Mutation(() => Place)
  async createPlace(@Args('data') data: CreatePlaceInput) {
    const result = await this.placeService.createPlace(data)
    return PlaceFactory.createFromDatabase(result)
  }
}
