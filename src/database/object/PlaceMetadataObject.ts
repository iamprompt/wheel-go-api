export const PlaceMetadataObject = {
  website: { type: String },
  phone: { type: String },
  busLine: { type: [String] },
  tramLine: { type: [String] },
}

export interface PlaceMetadata {
  website: string
  phone: string
  busLine: string[]
  tramLine: string[]
}
