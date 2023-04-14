export const LocationObject = {
  type: { type: String, required: true, enum: ['Point'] },
  coordinates: { type: [Number], required: true, index: '2dsphere' },
}

export interface Location {
  type: 'Point'
  coordinates: [number, number]
}
