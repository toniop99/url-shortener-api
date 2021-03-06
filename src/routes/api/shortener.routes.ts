import { Router } from 'express'
import { verifyToken } from '../../middlewares/authJwt'
import * as shortenerController from '../../controllers/shortener.controller'
const shortenerRoutes = Router()

shortenerRoutes.get('/', verifyToken, shortenerController.getUserShortenUrls)
shortenerRoutes.post('/create', verifyToken, shortenerController.createShortenUrl)
shortenerRoutes.delete('/delete', verifyToken, shortenerController.deleteShortenUrl)

export { shortenerRoutes }
