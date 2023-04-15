import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Facility {
  @Field(() => ID!)
  id: string
}
