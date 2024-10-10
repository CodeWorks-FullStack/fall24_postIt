import { Schema } from "mongoose";



export const PictureSchema = new Schema({
  imgUrl: { type: String, maxLength: 500, required: true },
  albumId: { type: Schema.ObjectId, ref: 'Album', required: true },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


PictureSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
PictureSchema.virtual('album', {
  localField: 'albumId',
  ref: 'Album',
  foreignField: '_id',
  justOne: true
})

