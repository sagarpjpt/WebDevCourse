import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Contact from "./pages/Contact.jsx";
import { useDispatch } from "react-redux";
import { apiConnector } from "./services/apiConnector.js";
import { auth } from './services/apis.js'
import { logout, setUser } from "./redux/slices/profileSlice.jsx";
import Spinner from './components/common/Spinner.jsx'
import PublicRoute from "./components/core/Auth/PublicRoute.jsx";
import VerifyEmailRoute from "./components/core/Auth/VerifyEmailRoute.jsx";
import About from "./pages/About.jsx";
import Rateus from "./pages/Rateus.jsx";
import Project from "./pages/Project.jsx";

const App = () => {

  const dispatch = useDispatch()
  const [authChecking, setAuthChecking] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // simulating a loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try{
        const res = await apiConnector("GET", auth.IS_LOGGED)
        if(res?.data?.success){
          dispatch(setUser(res.data.user))
        } else {
          dispatch(logout())
        }
      } catch(e) {
        dispatch(logout())
      } finally {
        setAuthChecking(false)
      }
    }
    fetchMe()
  }, [dispatch])

  if(authChecking || loading) {
    return <Spinner />
  }

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* public routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path='/verify-email' element={
          <VerifyEmailRoute>
            <VerifyEmail />
          </VerifyEmailRoute>
        } />
        <Route path='/contact' element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/rateus" element={<Rateus />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </div>
  );
};

export default App;
