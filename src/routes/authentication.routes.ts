import { Router } from 'express'
import { checkDuplicateUsername } from '../middlewares/verifySignUp'
import { login, register } from '../controllers/authentication.controller'
const authenticationRoutes = Router()

authenticationRoutes.post('/login', login)

authenticationRoutes.post('/register', checkDuplicateUsername, register)

export { authenticationRoutes }
