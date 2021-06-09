import { model, Schema, Document } from 'mongoose'
import { UrlShortener } from 'src/utils/types'

const UrlSchemaFields: Record<keyof UrlShortener, any> = {
  original: { type: String, required: true },
  shorten: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  creator: { type: String, required: true }
}

const UrlSchema: Schema = new Schema(UrlSchemaFields, {
  timestamps: true,
  versionKey: false
})

interface UrlDocument extends UrlShortener, Document {}

export const UrlModel = model<UrlDocument>('Url', UrlSchema)
