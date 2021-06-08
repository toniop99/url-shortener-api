import bcrypt from 'bcrypt'

export const encryptPassword = async (password: string): Promise<String> => {
  const salt = await bcrypt.genSalt(10)
  const cryptedPassword = await bcrypt.hash(password, salt)
  return cryptedPassword
}

export const comparePassword = async (password: string, receivedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, receivedPassword)
}
