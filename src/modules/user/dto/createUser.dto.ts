import { Field, InputType } from '@nestjs/graphql'
import { UserMetaInput } from '~/modules/object/dto/userMeta.dto'

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

  @Field(() => UserMetaInput, { nullable: true })
  metadata: UserMetaInput

  @Field({ nullable: true, defaultValue: 'USER' })
  role: string
}
