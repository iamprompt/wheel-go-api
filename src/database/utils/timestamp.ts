import { SchemaTimestampsConfig } from 'mongoose'

export interface Timestamp {
  createdAt: number
  updatedAt: number
}

export const TimestampConfig: SchemaTimestampsConfig = {
  // Store as Epoch time
  currentTime: () => Math.floor(Date.now() / 1000),
}
