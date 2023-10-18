import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../Redux/Slice/userSlice"
import { selectAdmin } from "../Redux/Slice/adminSlice";

export const PrivateRoutes = () => {
  const user = useSelector(selectUser); 
  return user ? <Outlet /> : <Navigate to='/login' />;
}

export const AdminPrivateRoutes = () => {
  const admin = useSelector(selectAdmin);
  return admin ? <Outlet /> : <Navigate to="/admin/login" />;
}
