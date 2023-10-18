import express from "express";
import {
  createEvent,
  getUserEvent,
  userLogin,
  userSignup,
} from "../../controllers/userController/userController";
import { protect } from "../../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

userRouter.post("/createEvent/:id", protect, createEvent);

userRouter.get("/getEvent", protect, getUserEvent)

export default userRouter;
