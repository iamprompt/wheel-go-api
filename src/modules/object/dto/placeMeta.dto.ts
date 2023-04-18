import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PlaceMetaInput {
  @Field({ nullable: true })
  website: string

  @Field({ nullable: true })
  phone: string

  @Field(() => [String], { nullable: true })
  busLine: string[]

  @Field(() => [String], { nullable: true })
  tramLine: string[]
}
