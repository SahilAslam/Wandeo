import express from 'express';
import { adminLogin, getUsers } from '../../controllers/adminController/adminController';
import { adminProtect } from '../../middlewares/adminAuthMiddleware';
const adminRouter = express.Router();

adminRouter.post('/login', adminLogin)

// adminRouter.post('/', adminProtect, adminDashboard)

adminRouter.get('/users', adminProtect, getUsers)

export default adminRouter;