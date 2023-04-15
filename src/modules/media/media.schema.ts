import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Media {
  @Field(() => ID!)
  id: string

  @Field()
  filename: string

  @Field()
  mimetype: string

  @Field()
  filesize: number

  @Field()
  width: number

  @Field()
  height: number

  @Field()
  url: string
}
