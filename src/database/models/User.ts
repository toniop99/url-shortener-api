import { model, Schema, Document } from 'mongoose'
import { User } from 'src/utils/types'

const UserSchemaFields: Record<keyof User, any> = {
  username: { type: String, unique: true },
  password: { type: String, required: true }
}

const UserSchema = new Schema(UserSchemaFields, {
  timestamps: true,
  versionKey: false
})

interface UserDocument extends User, Document {}

export const UserModel = model<UserDocument>('User', UserSchema)
