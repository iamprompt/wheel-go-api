import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  firstname: string

  @Field({ nullable: true })
  lastname: string

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true, defaultValue: 'USER' })
  role: string
}
