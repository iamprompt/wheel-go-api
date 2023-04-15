import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Location } from '../object/location.schema'
import { Place } from '../place/place.schema'
import { User } from '../user/user.schema'

@ObjectType()
export class Route {
  @Field(() => ID!)
  id: string

  @Field()
  type: string

  @Field(() => [Location])
  paths: Location[]

  @Field({ nullable: true })
  internalCode: string

  @Field({ nullable: true })
  origin: Place

  @Field({ nullable: true })
  destination: Place

  @Field(() => User)
  user: User

  @Field(() => Number, { nullable: true })
  distance: number

  @Field(() => Number, { nullable: true })
  duration: number

  @Field()
  status: string
}
