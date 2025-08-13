import NavBar from "./Component/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./Page/LogIn";
import Signup from "./Page/Signup";
import Setting from "./Page/Setting";
import Profile from "./Page/Profile";
import Home from './Page/Home';
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore";

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const{theme} = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div data-theme={theme}>
      
      <NavBar />

      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path='/login' element={!authUser ? <LogIn /> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to={'/login'}/>} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
