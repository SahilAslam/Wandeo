import express from "express";
import {
  userLogin,
  userSignup,
} from "../../controllers/userController/userController";
import { createUserEvent, eventUsersAttending, getUserEvent, joinUserEvent,  } from "../../controllers/userController/eventController";
import { protect } from "../../middlewares/authMiddleware";
const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

userRouter.post("/createEvent/:id", protect, createUserEvent);

userRouter.get("/getEvent", protect, getUserEvent)

userRouter.get("/joinEvent/:eventId", protect, joinUserEvent)

userRouter.get("/attendingEvents/:id", protect, eventUsersAttending)



export default userRouter;
