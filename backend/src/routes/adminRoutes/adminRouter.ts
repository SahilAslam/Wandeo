import express from 'express';
import { adminLogin, blockUser, getUsers, unblockUser } from '../../controllers/adminController/adminController';
import { adminProtect } from '../../middlewares/adminAuthMiddleware';
const adminRouter = express.Router();

adminRouter.post('/login', adminLogin)

// adminRouter.post('/', adminProtect, adminDashboard)

adminRouter.get('/usersList', adminProtect, getUsers)

adminRouter.patch('/blockUser/:id', adminProtect, blockUser)

adminRouter.patch('/unblockUser/:id', adminProtect, unblockUser)

export default adminRouter;