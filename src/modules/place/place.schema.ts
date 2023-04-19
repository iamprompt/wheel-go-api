import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Location } from '../object/location.schema'
import { PlaceMetadata } from '../object/placeMeta.schema'
import { Media } from '../media/media.schema'
import { STATUS } from '~/const/status'
import { PLACE_TYPES } from '~/const/placeTypes'

@ObjectType()
export class Place {
  @Field(() => ID!)
  id: string

  @Field(() => PLACE_TYPES, { nullable: true })
  type: PLACE_TYPES

  @Field()
  name: string

  @Field()
  address: string

  @Field(() => Location)
  location: Location

  @Field(() => [Media])
  images: Media[]

  @Field()
  internalCode: string

  @Field(() => PlaceMetadata)
  metadata: PlaceMetadata

  @Field(() => STATUS, { nullable: true })
  status: STATUS
}
