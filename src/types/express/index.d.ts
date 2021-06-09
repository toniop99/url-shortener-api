declare namespace Express {
  interface Request {
    user?: import ('../../utils/types').NonSensitiveUser
  }
}
