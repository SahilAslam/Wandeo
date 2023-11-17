import express from "express";
import {
  googleLogin,
  googleSignup,
  userLogin,
  userSignup,
} from "../../controllers/userController/userController";
import { createUserEvent, eventUsersAttending, getEventDetailedPage, getUserEvent, joinUserEvent, leaveUserEvent,  } from "../../controllers/userController/eventController";
import { protect } from "../../middlewares/authMiddleware";
import { addProfileImage, editUserProfile, getUserProfile } from "../../controllers/userController/profileController";
import { createUserGroup, deleteUserGroup, getGroupDetailedPage, getPopularGroup, getUserGroup, joinUserGroup, leaveUserGroup, userJoinedGroup } from "../../controllers/userController/groupController";
import { createNewDiscussion, getSingleDiscussion, postDiscussionReply } from "../../controllers/userController/groupDiscussionController";
import { createHostingFacility, getHostingFacility } from "../../controllers/userController/hostingController";
const userRouter = express.Router();

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

userRouter.post("/auth/google", googleSignup);

userRouter.post("/googleLogin", googleLogin);

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

userRouter.post("/hostingform/:userId", protect, createHostingFacility);

userRouter.get("/getHostingPref/:userId", protect, getHostingFacility);

// User Groups
userRouter.post("/createGroup/:id", protect, createUserGroup);

userRouter.get("/getGroups", protect, getUserGroup);

userRouter.get("/getPopularGroups", protect, getPopularGroup);

userRouter.get("/groupDetailedPage/:groupId", protect, getGroupDetailedPage);

userRouter.patch("/joinGroup/:groupId", protect, joinUserGroup);

userRouter.patch("/leaveGroup/:groupId", protect, leaveUserGroup);

userRouter.get("/joinedGroups/:userId", protect, userJoinedGroup);

userRouter.post("/createDiscussion/:groupId", protect, createNewDiscussion)

userRouter.get("/getDiscussion/:discussionId", protect, getSingleDiscussion)

userRouter.post("/discussionReply/:discussionId", protect, postDiscussionReply); 

userRouter.delete("/deleteGroup/:groupId", protect, deleteUserGroup);


export default userRouter;
