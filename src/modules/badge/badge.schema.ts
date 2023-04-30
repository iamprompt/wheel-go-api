import { Field, ID, ObjectType } from '@nestjs/graphql'
import { LanguageObject } from '../object/language.schema'
import { BadgeCondition } from '../object/badgeCondition.schema'

@ObjectType()
export class Badge {
  @Field(() => ID!)
  id: string

  @Field(() => LanguageObject)
  name: LanguageObject

  @Field(() => LanguageObject)
  description: LanguageObject

  @Field(() => String, { nullable: true })
  icon: string

  @Field(() => String, { nullable: true })
  color: string

  @Field(() => [BadgeCondition], { nullable: true })
  conditions: BadgeCondition[]
}
