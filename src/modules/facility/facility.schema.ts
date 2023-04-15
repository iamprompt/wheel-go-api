import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Place } from '../place/place.schema'
import { Location } from '../object/location.schema'
import { FacilityMetadata } from '../object/facilityMeta.schema'

@ObjectType()
export class Facility {
  @Field(() => ID!)
  id: string

  @Field({ nullable: true })
  type?: string

  @Field(() => Place, { nullable: true })
  parent?: Place

  @Field({ nullable: true })
  detail?: string

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => FacilityMetadata, { nullable: true })
  metadata?: FacilityMetadata

  @Field({ nullable: true })
  status?: string
}
