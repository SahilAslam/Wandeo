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
import OtpPassword from './Components/User/ForgotPassword/OtpPassword'
import NewPassword from './Components/User/ForgotPassword/NewPassword'
import ForgotPassword from './Components/User/ForgotPassword/ForgotPassword'
import InboxPage from './Pages/User/InboxPage/InboxPage'
import CreatePublicTrip from './Pages/User/Trips/CreatePublicTrip'
import PublicTrips from './Pages/User/Trips/PublicTrips'
import SearchPage from './Pages/User/Search/SearchPage'
import FindGroups from './Pages/User/Search/FindGroups/FindGroups'
import FindEvents from './Pages/User/Search/FindEvents/FindEvents'
import FindUsers from './Pages/User/Search/FindUsers/FindUsers'
import FindTravelers from './Pages/User/Search/FindTravelers/FindTravelers'
import CreateReference from './Pages/User/ReferencePage/CreateReference'
import AdminGroups from './Pages/Admin/AdminGroups/AdminGroups'
import AdminEventPage from './Pages/Admin/AdminEvents/AdminEventPage'
import AdminHosts from './Pages/Admin/AdminHosts/AdminHosts'
import PaymentPage from './Pages/User/PaymentPage/PaymentPage'
import PaymentSuccess from './Pages/User/PaymentPage/PaymentSuccess'
import HostUser from './Pages/User/TravelingAndHosting/HostUser'
import TravelingAndHostingDetailed from './Pages/User/InboxPage/TravelingAndHostingDetailed'
import MessageDetailedPage from './Pages/User/InboxPage/MessageDetailedPage'
import CreateUserInfoPage from './Pages/User/Signup/CreateUserInfoPage'

function App() {
  
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path='*' element={<h1>Page not Found</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/createuserinfo/:id' element={<CreateUserInfoPage />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
        <Route path="/user_forget_otp" element={<OtpPassword />} />
        <Route path="/new_password" element={<NewPassword />} />

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
          <Route path='/discussionPage/:id' element={<GroupDiscussionPage />} />
          <Route path='/DiffProfile/:id' element={<DiffUserProfile />} />
          <Route path='/allGroups' element={<AllGroups />} />
          <Route path='/inbox' element={<InboxPage />} />
          <Route path='/messageDetailedPage/:id' element={<TravelingAndHostingDetailed />} />
          <Route path='/directmessagedetailed/:id' element={<MessageDetailedPage />} />
          <Route path='/createPublicTrip' element={<CreatePublicTrip />} />
          <Route path='/publictrips' element={<PublicTrips />} />
          <Route path='/createReference/:id' element={<CreateReference />} />
          <Route path='/hostuser/:id' element={<HostUser />} />

          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/paymentSuccess' element={<PaymentSuccess />} />

          {/* search */}
          <Route path="/search" element={<SearchPage />} />
          <Route path='/findHosts' element={<FindHosts/>} />
          <Route path='/findGroups' element={<FindGroups />} />
          <Route path='/findEvents' element={<FindEvents />} />
          <Route path='/findUser' element={<FindUsers />} />
          <Route path='/findTravelers' element={<FindTravelers />} />
        </Route>


        {/* Admin routes */}
        <Route path='/admin/login' element={<AdminLogin/>} />

        {/* Admin's protected routes */}
        <Route element={<AdminPrivateRoutes/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>} />
          <Route path='/admin/usersList' element={<UsersList/>} />
          <Route path='/admin/groups' element={<AdminGroups />} />
          <Route path='/admin/events' element={<AdminEventPage />} />
          <Route path='/admin/hosts' element={<AdminHosts />} />
        </Route>     
      </Routes>
    </Router>
  )
}

export default App
