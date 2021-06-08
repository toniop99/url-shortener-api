import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from 'src/database/models/User'
import { toReceivedUser } from 'src/utils/cheks/User/typeChecks'
import { comparePassword, encryptPassword } from 'src/utils/utils'
import { env } from '..'

export async function login (req: Request, res: Response): Promise<void> {
  try {
    const newUserEntry = toReceivedUser(req.body)
    const newUserModel = await UserModel.findOne({ username: newUserEntry.username })

    if (!newUserModel) {
      res.status(404).json({ message: 'User not found' }).end()
      return
    }

    const matchPassword = await comparePassword(newUserEntry.password, newUserModel.password)
    if (!matchPassword) {
      res.status(401).json({
        message: 'Invalid Password'
      })

      return
    }

    const token = jwt.sign({ id: newUserModel?._id }, env.KEY, {
      expiresIn: '7d'
    })
    res.status(200).json({
      message: 'Login Success',
      token: token
    })
  } catch (e) {
    res.status(400).json({
      message: e.message
    })
  }
}

export async function register (req: Request, res: Response): Promise<void> {
  try {
    const newUserEntry = toReceivedUser(req.body)
    const cryptedPassword = await encryptPassword(newUserEntry.password)
    const newUser = new UserModel({
      username: newUserEntry.username,
      password: cryptedPassword
    })

    const savedUser = await newUser.save()
    const token = jwt.sign({ id: savedUser._id }, env.KEY, {
      expiresIn: '7d'
    })

    res.status(201).json({
      message: 'User created satisfactorily',
      token: token
    }).end()
  } catch (e) {
    res.status(500).json({
      message: e.message
    }).end()
  }
}
