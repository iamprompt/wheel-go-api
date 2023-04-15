import { Field, ID, Resolver } from '@nestjs/graphql'

@Resolver()
export class RouteResolver {
  @Field(() => ID!)
  id: string
}
