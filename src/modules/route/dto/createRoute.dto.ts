import { Field, Float, InputType } from '@nestjs/graphql'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class CreateRouteInput {
  @Field(() => String, { nullable: true })
  type?: string

  @Field(() => [LocationInput], { nullable: true })
  paths?: LocationInput[]

  @Field(() => String, { nullable: true })
  internalCode?: string

  @Field(() => String, { nullable: true })
  origin?: string

  @Field(() => String, { nullable: true })
  destination?: string

  @Field(() => String, { nullable: true })
  user?: string

  @Field(() => Float, { nullable: true })
  distance?: number

  @Field(() => Float, { nullable: true })
  duration?: number

  @Field(() => String, { nullable: true })
  status?: string
}
