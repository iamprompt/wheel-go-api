import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Announcement {
  @Field(() => ID!)
  id: string
}
