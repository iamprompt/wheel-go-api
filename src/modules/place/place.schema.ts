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
  type?: PLACE_TYPES

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  address?: string

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => [Media], { nullable: true })
  images?: Media[]

  @Field({ nullable: true })
  internalCode?: string

  @Field(() => PlaceMetadata, { nullable: true })
  metadata?: PlaceMetadata

  @Field(() => STATUS, { nullable: true })
  status?: STATUS
}
