export const LocationObject = {
  type: { type: String, required: true, enum: ['Point'] },
  coordinates: { type: [Number], required: true },
}

export interface Location {
  type: 'Point'
  coordinates: [number, number]
}
