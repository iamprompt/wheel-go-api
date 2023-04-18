import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PlaceMetadata {
  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => [String], { nullable: true })
  busLine?: string[]

  @Field(() => [String], { nullable: true })
  tramLine?: string[]
}
