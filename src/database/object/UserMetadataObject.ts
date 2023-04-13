import { Schema } from 'mongoose'
import type { FavoritePlace } from './FavoritePlaceObject'

export const UserMetadataObject = {
  impairmentLevel: { type: String },
  equipment: { type: String },
  favorites: [
    {
      addedAt: { type: Date, default: Date.now },
      place: { type: Schema.Types.ObjectId, ref: 'Place' },
    },
  ],
}

export interface UserMetadata {
  impairmentLevel: string
  equipment: string
  favorites: FavoritePlace[]
}
