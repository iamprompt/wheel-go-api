import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Review {
  @Field(() => ID!)
  id: string
}
