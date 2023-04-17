import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID!)
  id: string

  @Field({ nullable: true })
  firstname: string

  @Field({ nullable: true })
  lastname: string

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  role: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date
}
