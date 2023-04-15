import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID!)
  id: string

  @Field()
  firstname: string

  @Field()
  lastname: string

  @Field()
  username: string

  @Field()
  role: string

  @Field()
  email: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
