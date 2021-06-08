import { Router } from 'express'
import { verifyToken } from 'src/middlewares/authJwt'
import * as shortenerController from 'src/controllers/shortener.controller'
const shortenerRoutes = Router()

shortenerRoutes.get('/', (_, res) => res.json('test'))
shortenerRoutes.post('/create', verifyToken, shortenerController.createShortenUrl)
shortenerRoutes.delete('/delete', verifyToken, shortenerController.deleteShortenUrl)

export { shortenerRoutes }
