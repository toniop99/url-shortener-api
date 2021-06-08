import { Handler, NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../database/models/User'
import { jwtDecodedData } from '../utils/types'
import { env } from '../index'

export const verifyToken: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  if (token === undefined) {
    return res.status(401).json({ message: 'No token provided' })
  }

  if (typeof token !== 'string') {
    return res.status(401).json({ message: 'The token provided is not a string' })
  }

  try {
    const decoded = jwt.verify(token.substring(7), env.KEY) as jwtDecodedData
    const user = await UserModel.findById(decoded.id, { password: 0 }).lean()
    if (user == null) return res.status(404).json({ message: 'No user found' })
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }
}
