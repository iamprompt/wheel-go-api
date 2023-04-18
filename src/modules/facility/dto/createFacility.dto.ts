import { Field, InputType } from '@nestjs/graphql'
import { STATUS } from '~/const/status'
import { FacilityMetaInput } from '~/modules/object/dto/facilityMeta.dto'
import { LanguageObjectInput } from '~/modules/object/dto/language.dto'
import { LocationInput } from '~/modules/object/dto/location.dto'

@InputType()
export class CreateFacilityInput {
  @Field()
  type: string

  @Field()
  parent: string

  @Field(() => LanguageObjectInput, { nullable: true })
  detail: LanguageObjectInput

  @Field(() => LocationInput, { nullable: true })
  location: LocationInput

  @Field(() => FacilityMetaInput, { nullable: true })
  metadata: FacilityMetaInput

  @Field(() => STATUS, { nullable: true, defaultValue: STATUS.DRAFT })
  status: STATUS
}
