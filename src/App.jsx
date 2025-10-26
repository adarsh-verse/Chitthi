
import {Navigate, Route,Routes} from 'react-router-dom'
import { Login } from './pages/Login'
import SignUp from './pages/SignUp'
import useCurrentUser from './customHooks/useCurrentUser'
import { useSelector } from 'react-redux';
import Home from "./pages/Home"
import Profile from "./pages/Profile"
function App() {
 useCurrentUser();
let {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/login' element={!userData? <Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData? <SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData? <Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>: <Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App
