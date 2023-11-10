import express from "express";
import {
  userLogin,
  userSignup,
} from "../../controllers/userController/userController";
import { createUserEvent, eventUsersAttending, getEventDetailedPage, getUserEvent, joinUserEvent, leaveUserEvent,  } from "../../controllers/userController/eventController";
import { protect } from "../../middlewares/authMiddleware";
import { addProfileImage, editUserProfile, getUserProfile } from "../../controllers/userController/profileController";
import { createUserGroup, getGroupDetailedPage, getUserGroup, joinUserGroup, leaveUserGroup, userJoinedGroup } from "../../controllers/userController/groupController";
import { createNewDiscussion } from "../../controllers/userController/groupDiscussionController";
const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

// User events
userRouter.post("/createEvent/:id", protect, createUserEvent);

userRouter.get("/getEvent", protect, getUserEvent)

userRouter.get("/joinEvent/:eventId", protect, joinUserEvent)

userRouter.get("/leaveEvent/:eventId", protect, leaveUserEvent);

userRouter.get("/attendingEvents/:id", protect, eventUsersAttending)

userRouter.get("/eventDetails/:id", protect, getEventDetailedPage)

// User Profile
userRouter.get("/profile/:userId", protect, getUserProfile);

userRouter.post("/editUser/:userId", protect, editUserProfile)

userRouter.post("/addImage/:userId", protect, addProfileImage);

// User Groups
userRouter.post("/createGroup/:id", protect, createUserGroup);

userRouter.get("/getGroups", protect, getUserGroup);

userRouter.get("/groupDetailedPage/:groupId", protect, getGroupDetailedPage);

userRouter.patch("/joinGroup/:groupId", protect, joinUserGroup);

userRouter.patch("/leaveGroup/:groupId", protect, leaveUserGroup);

userRouter.get("/joinedGroups/:userId", protect, userJoinedGroup);

userRouter.post("/createDiscussion/:groupId", protect, createNewDiscussion)

export default userRouter;
