import express from 'express'
import { signUp } from '../controller/AuthController.js'

const authRouter = express.Router()
authRouter.post("/signup",signUp)



export default authRouter