import { Field, InputType } from '@nestjs/graphql'
import { UserMetaInput } from '~/modules/object/dto/userMeta.dto'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname: string

  @Field({ nullable: true })
  lastname: string

  @Field({ nullable: true })
  username: string

  @Field({ nullable: true })
  role: string

  @Field(() => UserMetaInput, { nullable: true })
  metadata: UserMetaInput
}
