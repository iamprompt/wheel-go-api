import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Location } from '../object/location.schema'
import { PlaceMetadata } from '../object/placeMeta.schema'
import { Media } from '../media/media.schema'

@ObjectType()
export class Place {
  @Field(() => ID!)
  id: string

  @Field()
  type: string

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

  @Field({ nullable: true })
  status: string
}
