import { Router } from 'express'
import * as redirectorController from '../controllers/redirector.controller'

const redirectorRoutes = Router()

redirectorRoutes.get('/:path', redirectorController.redirectToPath)

export { redirectorRoutes }
