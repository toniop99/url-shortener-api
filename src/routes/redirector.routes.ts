import { Router } from 'express'
import * as redirectorController from 'src/controllers/redirector.controller'

const redirectorRoutes = Router()

redirectorRoutes.get('/:path', redirectorController.redirectToPath)

export { redirectorRoutes }
