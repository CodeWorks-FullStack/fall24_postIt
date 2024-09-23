import { Schema } from "mongoose";


export const AlbumSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 25, required: true },
  description: { type: String, minLength: 15, maxLength: 250 },
  coverImg: { type: String, maxLength: 500, required: true },
  archived: { type: Boolean, required: true, default: false },
  category: { type: String, enum: ['aesthetics', 'food', 'games', 'animals', 'vibes', 'misc'], required: true },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

AlbumSchema.virtual('banana',)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
