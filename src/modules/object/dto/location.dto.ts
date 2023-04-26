import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class LocationInput {
  @Field(() => Float, { nullable: true })
  lat: number

  @Field(() => Float, { nullable: true })
  lng: number
}
