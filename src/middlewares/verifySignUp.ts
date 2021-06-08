import { NextFunction, Request, Response } from 'express'
import { UserModel } from 'src/database/models/User'

export const checkDuplicateUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findOne({ username: req.body.username })
    if (user != null) {
      res.status(400).json({ message: 'The user already exists.' })
    }
    next()
  } catch (e) {
    res.status(500).json({ message: e })
  }
}
