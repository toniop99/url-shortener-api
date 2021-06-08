import { Router } from 'express'
import { checkDuplicateUsername } from 'src/middlewares/verifySignUp'
import { login, register } from 'src/controllers/authentication.controller'
const authenticationRoutes = Router()

authenticationRoutes.post('/login', login)

authenticationRoutes.post('/register', checkDuplicateUsername, register)

export { authenticationRoutes }
