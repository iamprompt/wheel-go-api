import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PlaceMetadata {
  @Field({ nullable: true })
  website?: string

  @Field({ nullable: true })
  phone?: string
}
