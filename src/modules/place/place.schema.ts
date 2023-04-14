import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Location } from '../object/location.schema'
import { PlaceMetadata } from '../object/placeMeta.schema'

@ObjectType()
export class Place {
  @Field(() => ID)
  id: string

  @Field()
  type: string

  @Field()
  name: string

  @Field()
  address: string

  @Field(() => Location)
  location: Location

  @Field(() => [String])
  images: string[]

  @Field()
  internalCode: string

  @Field(() => PlaceMetadata)
  metadata: PlaceMetadata

  @Field()
  status: string
}
