import { Field, InputType } from '@nestjs/graphql'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'
import { LocationInput } from '~/modules/object/dto/location.dto'
import { PlaceMetaInput } from '~/modules/object/dto/placeMeta.dto'

@InputType()
export class CreatePlaceInput {
  @Field(() => String, { nullable: true })
  type: string

  @Field(() => LanguageObjectInput, { nullable: true })
  name: LanguageObjectInput

  @Field(() => LanguageObjectInput, { nullable: true })
  address: LanguageObjectInput

  @Field(() => LocationInput, { nullable: true })
  location: LocationInput

  @Field(() => [String], { nullable: true })
  images: string[]

  @Field(() => String, { nullable: true })
  internalCode: string

  @Field(() => PlaceMetaInput, { nullable: true })
  metadata: PlaceMetaInput

  @Field(() => String, { nullable: true })
  status: string
}
