import './App.css';
import { Route, Routes } from "react-router-dom"
import About from "../pages/About"
import Contact from "../pages/Contact"
import MainLayout from '../layouts/MainLayout';
import UserError from '../pages/UserError';
import SystemError from '../pages/SystemError';
import Main from "../pages/Main"
import { createContext } from 'react';
import { useState } from 'react';
import {Home} from "./Home"
import Settings from '../pages/Settings';
import UserProfile from '../pages/UserProfile';
import Profile from '../pages/Profile';
import Jobs from '../pages/Jobs';
import Forum from './Pages/Forum';
import FullPost from '../pages/FullPost';


const LoggedInContext = createContext({
  isLoggedIn:false,
  setIsLoggedIn:()=>{}
})

/**
 * Links to pages to display information from that page
 * @returns set of routes
 */
function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const loggedInValueAndSetter=[isLoggedIn,setIsLoggedIn]
  return (
    <div className="App">
      <LoggedInContext.Provider value={loggedInValueAndSetter}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="*" element={<p>Invalid URL</p>} />
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path='about/:employee' element={<About/>} />
          <Route path="contact" element={<Contact />} />
          <Route path="usererror" element={<UserError/>}/>
          <Route path="systemerror" element={<SystemError/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="jobs" element={<Jobs/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="profile/:username" element={<UserProfile/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="forum" element={<Forum/>}/>
          <Route path="posts/:postId" element={<FullPost/>}/>
        </Route>
      </Routes>

      </LoggedInContext.Provider>
    </div>
  );
}



export default App;
export {LoggedInContext}

