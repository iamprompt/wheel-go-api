import { Field, Float, InputType } from '@nestjs/graphql'

@InputType()
export class LocationInput {
  @Field(() => Float)
  lat: number

  @Field(() => Float)
  lng: number
}
