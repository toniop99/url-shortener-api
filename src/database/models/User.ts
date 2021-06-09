import { model, Schema, Document } from 'mongoose'
import { DatabaseUser } from '../../utils/types'

const UserSchemaFields: Record<keyof DatabaseUser, any> = {
  username: { type: String, unique: true },
  password: { type: String, required: true }
}

const UserSchema = new Schema(UserSchemaFields, {
  timestamps: true,
  versionKey: false
})

interface UserDocument extends DatabaseUser, Document {}

export const UserModel = model<UserDocument>('User', UserSchema)
