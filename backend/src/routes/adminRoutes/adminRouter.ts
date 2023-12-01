import express from 'express';
import { adminDashboard, adminLogin, blockGroup, blockUser, findUsers, getEvents, getGroups, getHosts, getUsers, unblockGroup, unblockUser } from '../../controllers/adminController/adminController';
import { adminProtect } from '../../middlewares/adminAuthMiddleware';
const adminRouter = express.Router();

adminRouter.post('/login', adminLogin)

adminRouter.get('/', adminProtect, adminDashboard)

adminRouter.get('/usersList', adminProtect, getUsers)

adminRouter.patch('/blockUser/:id', adminProtect, blockUser)

adminRouter.patch('/unblockUser/:id', adminProtect, unblockUser)

adminRouter.get('/findUsers', adminProtect, findUsers);

adminRouter.get('/getGroups', adminProtect, getGroups);

adminRouter.get('/getEvents', adminProtect, getEvents);

adminRouter.get('/gethost', adminProtect, getHosts);

adminRouter.patch('/blockGroup/:id', adminProtect, blockGroup)

adminRouter.patch('/unblockGroup/:id', adminProtect, unblockGroup)

export default adminRouter;