import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData} from '../redux/UserSlice';

let loginToken = null;

function Login() {
let navigate = useNavigate()
    let[show, setShow] = useState(true)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let[loading, setLoading] = useState(false)
    let[error, setError] = useState("")
    let dispatch = useDispatch()
    const handleLogin= async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email,
                password
            }, { withCredentials: true })
            
            
            await dispatch(setUserData(result.data.user));
            navigate("/")
            
            setEmail("")
            setPassword("")
            setLoading(false)
            setError("")
        } catch (err) {
            console.log(err.message);
            setLoading(false)
            setError(err.response.data.message)
        }
    } 

  return (
      <div className='w-full h-screen bg-slate-200 flex items-center justify-center rounded-x3'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg backdrop-blur-lg shadow-gray-300 shadow-lg flex flex-col gap-[30px]'>
          <div className='w-full h-[200px] bg-linear-to-r from-sky-400 to-indigo-500 rounded-b-[30%] shadow-gray-300 shadow-lg flex items-center justify-center'>
            <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'>Chitthi</span></h1>
          </div>

        <form className='w-full flex flex-col gap-5 items-center' onSubmit={(e)=>handleLogin(e)}>
           
            <input  className='w-[90%] h-[50px] outline-none border-2 border-sky-400 px-5 py-2.5 bg-white rounded-lg shadow-gray-300 shadow-lg' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' />
            <div className='w-[90%] h-[50px] border-2 border-sky-400 overflow-hidden rounded-lg  shadow-gray-300 shadow-lg relative'>
            <input  className='w-full h-full outline-none  px-5 py-2.5 bg-white ' type={`${show?"text":"password"}`} onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='password' />
            <span className='absolute top-2.5 right-2.5 text-2.4 text-sky-300 font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{`${show?"hide":"show"}`}</span>
            </div>
            {error && <p className='text-red-600'>{error}</p>}
            <button className='px-5 py-2.5 bg-linear-to-r from-sky-400 to-indigo-500 rounded-2xl w-[200px] mt-5 font-semibold shadow-gray-300 shadow-lg text-[20px] hover:shadow-inner text-gray-800' disabled={loading || error}>{loading?"Loading...":"Login"}</button>
            <p className='cursor-pointer'onClick={()=>navigate("/signup")}>Don't Have An Account ? <span className='text-emerald-400 font-semibold text-sky-400 '>Sign Up</span></p>
        </form>

        </div>
      </div>

  );
  
}

export {Login, loginToken};
