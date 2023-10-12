import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../Slice/userSlice'
import adminSlice from '../Slice/adminSlice';


export default configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice,
    }
});