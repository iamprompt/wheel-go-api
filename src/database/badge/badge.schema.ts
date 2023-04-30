import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Timestamp } from 'mongodb'
import { TimestampConfig } from '../utils/timestamp'
import { LangObject, LangObjectDefinition } from '../object/LangObject'
import {
  BadgeCondition,
  BadgeConditionObject,
} from '../object/BadgeConditionObject'

@Schema({ collection: 'badges', timestamps: TimestampConfig })
export class Badge {
  @Prop({ type: LangObjectDefinition })
  name: LangObject

  @Prop({ type: LangObjectDefinition })
  description: LangObject

  @Prop()
  icon: string

  @Prop()
  color: string

  @Prop({ type: [BadgeConditionObject] })
  conditions: BadgeCondition[]
}

export type BadgeDocument = HydratedDocument<Badge, Timestamp>
export const BadgeSchema = SchemaFactory.createForClass(Badge)
