import express from "express";

import {
  createUserInfo,
  googleLogin,
  googleSignup,
  newPassword,
  sendPasswordLink,
  userLogin,
  userLogout,
  userSignup,
  verifyForgetPassword,
} from "../../controllers/userController/userController";
import { createUserEvent, eventUsersAttending, getEventDetailedPage, getUserEvent, joinUserEvent, leaveUserEvent,  } from "../../controllers/userController/eventController";
import { protect } from "../../middlewares/authMiddleware";
import { addProfileImage, editUserProfile, getUserProfile, propertyImage } from "../../controllers/userController/profileController";
import { createUserGroup, deleteUserGroup, getGroupDetailedPage, getPopularGroup, getUserGroup, joinUserGroup, leaveUserGroup, userJoinedGroup } from "../../controllers/userController/groupController";
import { createNewDiscussion, getSingleDiscussion, postDiscussionReply } from "../../controllers/userController/groupDiscussionController";
import { createHostingFacility, findExistingHostingChat, getHostingFacility, hostAUser, requestForHosting, sendSimpleMessage } from "../../controllers/userController/hostingController";
import { createPublicTrip, getOtherUserTrips, getPublicTrips } from "../../controllers/userController/tripController";
import { fetchTavelers, getSearchedUsers, listGroups, listHostingUsers } from "../../controllers/userController/searchController";
import { createReference } from "../../controllers/userController/referenceController";
import { accessChat, fetchChat, sendMessage, showAllMessages } from "../../controllers/chatController/chatController";
import { addFriend } from "../../controllers/userController/friendsController";
import { createDirectMessage, findExistingChat, getDirectMessages, getHostingMessage, getSingleDirectMessage, getSingleHostingMessage, sendDirectMessage, sendResponse } from "../../controllers/userController/inboxController";
const userRouter = express.Router();
import { Request, Response } from "express";

userRouter.post("/signup", userSignup);

userRouter.post("/login", userLogin);

userRouter.post("/createuserinfo/:userId", createUserInfo);

userRouter.post("/auth/google", googleSignup);

userRouter.post("/googleLogin", googleLogin);

userRouter.post('/forgotPassword', sendPasswordLink)

userRouter.post("/otp_verify", verifyForgetPassword);

userRouter.post("/newpassword", newPassword);

userRouter.put("/logout", protect, userLogout)

userRouter.get("/sample", (req: Request, res: Response) => {
  console.log("Raja")
  console.log(process.env.EMAIL,"a;lksdjf;alkjsdf;laksjf;lkajfds")
  return res.send({data:process.env.JWT_SECRET,ful:"simple"})
})

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

userRouter.post("/addpropimg", protect, propertyImage);

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

// user trip
userRouter.post("/createPublicTrip/:userId", protect, createPublicTrip);

userRouter.get("/getPublicTrips", protect, getPublicTrips);

userRouter.get("/getotherstrips/:id", protect, getOtherUserTrips)

// search
userRouter.get("/searchGroup", protect, listGroups);

userRouter.get("/findHosts", protect, listHostingUsers);

userRouter.get("/findUser", protect, getSearchedUsers);

userRouter.get("/findTravelers", protect, fetchTavelers);

// userReference
userRouter.post("/addReference/:targettedUserId", protect, createReference);

// friends
userRouter.post("/addFriend", protect, addFriend);

userRouter.get("/getFriends", protect, )

// hosting and traveling
userRouter.post("/hostuser/:targettedUserId", protect, hostAUser );

userRouter.post("/requestauser/:targettedUserId", protect, requestForHosting);

userRouter.post("/sendSimpleMessage/:chatId", protect, sendSimpleMessage);

userRouter.get('/findexhostingchat/:id', protect, findExistingHostingChat);

// inbox
userRouter.get("/gethostingmessages", protect, getHostingMessage);

userRouter.get("/singlehostingmessage/:chatId", protect, getSingleHostingMessage);

userRouter.post("/sendresponse/:chatId", protect, sendResponse);

userRouter.post("/createmessage/:targettedUserId", protect, createDirectMessage);

userRouter.get("/getdirectmessage", protect, getDirectMessages)

userRouter.get('/messagedetailedpage/:chatId', protect, getSingleDirectMessage);

userRouter.put("/sendmessage/:chatId", protect, sendDirectMessage)

userRouter.get('/findexistingchat/:id', protect, findExistingChat);

// chat
userRouter.post("/chat", protect, accessChat);

userRouter.get("/getChat", protect, fetchChat);

userRouter.post('/chatSend', protect, sendMessage);

userRouter.get('/viewMessages/:chatId', protect, showAllMessages);


export default userRouter;
