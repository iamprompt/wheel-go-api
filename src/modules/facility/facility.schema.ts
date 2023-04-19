import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Place } from '../place/place.schema'
import { Location } from '../object/location.schema'
import { FacilityMetadata } from '../object/facilityMeta.schema'
import { STATUS } from '~/const/status'
import { FACILITY_TYPES } from '~/const/facilityTypes'
import { CONCERN_TYPES } from '~/const/concernTypes'

@ObjectType()
export class Facility {
  @Field(() => ID!)
  id: string

  @Field(() => FACILITY_TYPES, { nullable: true })
  type?: FACILITY_TYPES

  @Field(() => Place, { nullable: true })
  parent?: Place

  @Field({ nullable: true })
  detail?: string

  @Field(() => Location, { nullable: true })
  location?: Location

  @Field(() => CONCERN_TYPES, { nullable: true })
  concern?: CONCERN_TYPES

  @Field(() => FacilityMetadata, { nullable: true })
  metadata?: FacilityMetadata

  @Field(() => STATUS, { nullable: true })
  status?: STATUS
}
