import { model, Schema, Document } from 'mongoose'

export interface DatabaseUrl extends Document {
  original: string
  shorten: string
  clicks: number
  active: boolean
}

const Url: Schema = new Schema({
  original: { type: String, required: true },
  shorten: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
  active: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false
})

export const UrlModel = model<DatabaseUrl>('Url', Url)
