import express from 'express'
import { userLogin, userSignup } from '../../controllers/userController/userController';
const userRouter = express.Router()

userRouter.post('/signup', userSignup)
userRouter.post('/login', userLogin)

export default userRouter;