import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashBoard from './pages/DashBoard'
import PrivateRoute from './components/PrivateRoute'
import { useState } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    <div className='w-screen h-screen bg-richblack-900 flex flex-col overflow-x-hidden'>

      <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />

      {/* creating routes */}
      <Routes>

        <Route path='/' element={<Home isLoggedIn = {isLoggedIn} />}></Route>
        <Route path='/login' element={<Login isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />}></Route>
        <Route path='/signup' element={<Signup isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />}></Route>
        {/* we have to make dashboard page to be protected so that it cant be directly accessible */}
        <Route path='/dashboard' element={
          <PrivateRoute isLoggedIn = {isLoggedIn} >
            <DashBoard />
          </PrivateRoute>
        }></Route>

      </Routes>

    </div>
  )
}

export default App
