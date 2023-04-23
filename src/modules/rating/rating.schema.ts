import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { FacilitiesAvailability } from '../object/facilityAvailability.schema'

@ObjectType()
export class RatingSummary {
  @Field(() => ID!)
  id: string

  @Field(() => Float)
  overall: number

  @Field(() => FacilitiesAvailability)
  facilities: FacilitiesAvailability

  @Field(() => Int)
  reviewCount: number
}
