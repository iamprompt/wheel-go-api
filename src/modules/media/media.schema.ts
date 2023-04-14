import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Media {
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
