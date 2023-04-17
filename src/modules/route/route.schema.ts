import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Location } from '../object/location.schema'
import { Place } from '../place/place.schema'
import { User } from '../user/user.schema'

@ObjectType()
export class Route {
  @Field(() => ID!)
  id: string

  @Field({ nullable: true })
  type: string

  @Field(() => [Location], { nullable: true })
  paths: Location[]

  @Field({ nullable: true })
  internalCode: string

  @Field({ nullable: true })
  origin: Place

  @Field({ nullable: true })
  destination: Place

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Number, { nullable: true })
  distance: number

  @Field(() => Number, { nullable: true })
  duration: number

  @Field({ nullable: true })
  status: string
}
