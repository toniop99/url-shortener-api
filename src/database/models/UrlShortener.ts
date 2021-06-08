import { model, Schema, Document } from 'mongoose'

export interface DatabaseUrl extends Document {
  original: string
  shorten: string
  clicks: number
  active: boolean
}

const Url: Schema = new Schema({
  original: String,
  shorten: String,
  clicks: { type: Number, default: 0 },
  active: Boolean
}, {
  timestamps: true,
  versionKey: false
})

export const UrlModel = model<DatabaseUrl>('Url', Url)
