import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/User/Login/Login'
import HomePage from './Pages/User/HomePage/HomePage'
import Signup from './Pages/User/Signup/Signup'
import UserEvents from './Pages/User/UserEvents/UserEvents'
import { PrivateRoutes } from './Components/PrivatePages'
import { AdminPrivateRoutes } from './Components/PrivatePages'
import { AdminDashboard } from './Pages/Admin/AdminDashboard/AdminDashboard'
import { AdminLogin } from './Pages/Admin/AdminLogin/AdminLogin'
import UsersList from './Pages/Admin/AdminUsersList/UsersList'
import UserProfile from './Pages/User/Profile/UserProfile'
import EditProfile from './Pages/User/Profile/EditProfile'
import EventDetailedPage from './Pages/User/UserEvents/EventDetailedPage/EventDetailedPage'
import GroupPage from './Pages/User/UserGroup/GroupPage'
import CreateGroup from './Pages/User/UserGroup/CreateGroup'
import FindHosts from './Pages/User/Search/FindHosts/FindHosts'
import GroupDetailedPage from './Pages/User/UserGroup/GroupDetailedPage/GroupDetailedPage'
import GroupDiscussionPage from './Pages/User/UserGroup/GroupDiscussionPage'
import AllGroups from './Pages/User/UserGroup/AllGroups'
import DiffUserProfile from './Pages/User/Profile/DiffUserProfile'

function App() {
  
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path='*' element={<h1>Page not Found</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        {/*User's protected routes */}
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<HomePage/>} />
          <Route path='/events' element={<UserEvents/>} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/editProfile/:id' element={<EditProfile/>} />
          <Route path='/eventDetailedPage/:id' element={<EventDetailedPage/>} />
          <Route path='/groups' element={<GroupPage/>} />
          <Route path='/createGroup' element={<CreateGroup/>} />
          <Route path='/groupDetailedPage/:id' element={<GroupDetailedPage/>} />
          <Route path='/findHosts' element={<FindHosts/>} />
          <Route path='/discussionPage/:id' element={<GroupDiscussionPage />} />
          <Route path='/DiffProfile/:id' element={<DiffUserProfile />} />
          <Route path='/allGroups' element={<AllGroups />} />
        </Route>


        {/* Admin routes */}
        <Route path='/admin/login' element={<AdminLogin/>} />

        {/* Admin's protected routes */}
        <Route element={<AdminPrivateRoutes/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>} />
          <Route path='/admin/usersList' element={<UsersList/>} />
        </Route>     
      </Routes>
    </Router>
  )
}

export default App
