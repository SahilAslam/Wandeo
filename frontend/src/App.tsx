import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/User/Login/Login'
import HomePage from './Pages/User/HomePage/HomePage'
import Signup from './Pages/User/Signup/Signup'
import UserEvents from './Pages/User/UserEvents/UserEvents'
import { PrivateRoutes } from './Components/PrivatePages'
import { AdminDashboard } from './Pages/Admin/AdminDashboard/AdminDashboard'
import { AdminLogin } from './Pages/Admin/AdminLogin/AdminLogin'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='*' element={<h1>Page not Found</h1>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        {/* protected routes */}
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<HomePage/>} />
          <Route path='/events' element={<UserEvents/>} />
        </Route>


        {/* Admin routes */}

        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
      </Routes>
    </Router>
  )
}

export default App
