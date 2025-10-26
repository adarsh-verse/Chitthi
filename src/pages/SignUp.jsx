import React, { useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../main';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/UserSlice';



function SignUp() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [userName, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")
    let [message, setMessage] = useState("")
    let dispatch = useDispatch()


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!userName.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters")
            return;
        }
        setLoading(true)
        setMessage("signing...")
        setError("")
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                userName,
                email,
                password
            }, { withCredentials: true })

            dispatch(setUserData(result.data))

            if (result.status === 201) {
                setMessage("Signup successful! Redirecting to login...")
                setTimeout(() => navigate("/login"), 1500);
            }
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

    const inputRefs = useRef([]);


    const handleKeyNavigation = (e, index) => {

        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();

            if (inputRefs[index + 1]) {
                inputRefs[index + 1].focus();
            }
        }


        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (inputRefs[index + 1]) inputRefs[index + 1].focus();
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (inputRefs[index - 1]) inputRefs[index - 1].focus();
        }
    };


    return (
        <div className='w-full h-screen flex items-center justify-center bg-linear-to-r from-pink-100 via-purple-100 to-indigo-200'>

            <div className='w-full max-w-[500px] h-[600px]  rounded-lg bg-white shadow-gray-300 shadow-lg flex items-center justify-center flex-col gap-[30px]'>

                <div className='w-[90%] h-[200px] bg-linear-to-r from-sky-400 to-indigo-500
 rounded-b-[40%] shadow-lg flex flex-col items-center justify-end relative overflow-hidden shadow-gray-600'>


                    <div className='absolute w-20 h-20 bg-white/10 rounded-full animate-float -top-5 -left-5'></div>
                    <div className='absolute w-[120px] h-[120px] bg-white/20 rounded-full animate-float-slow bottom-[-30px] right-[-30px]'></div>
                    <div className='absolute w-[50px] h-[50px] bg-white/10 rounded-full animate-float top-10 right-[50px]'></div>

                    <div className='flex items-end justify-center w-full h-full relative'>
                        <h1 className="absolute bottom-[130px] text-2xl font-bold text-white tracking-wide drop-shadow-md">
                            Welcome to <span className="text-yellow-200">Chitthi❤️</span>
                        </h1>
                        <img src="./chitthi.png" alt="" className='h-[200px] w-[200px]  object-contain block m-0 p-0 absolute bottom-[-45px] drop-shadow-lg' />
                    </div>
                </div>

                <form className='w-full flex flex-col gap-5 items-center' onSubmit={(e) => handleSignUp(e)}>
                    <input
                        className='w-[90%] h-[50px] outline-none border-2 border-sky-400 px-5 py-2.5 bg-white/30 rounded-lg hover:shadow-lg hover:shadow-blue-500/70 transition-all duration-300 shadow-gray-300 shadow-lg'
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => handleKeyNavigation(e, 0)}
                        ref={(el) => (inputRefs[0] = el)}
                        value={userName}
                        type="text"
                        placeholder='username'
                    />

                    <input className='w-[90%] h-[50px] outline-none border-2 hover:shadow-lg hover:shadow-blue-500/70 transition-all duration-300 border-sky-400 px-5 py-2.5 bg-white/30 rounded-lg shadow-gray-300 shadow-lg' onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => handleKeyNavigation(e, 1)} value={email} ref={(el) => (inputRefs[1] = el)} type="email" placeholder='email' />
                    <div className='w-[90%] h-[50px] border-2 border-sky-400 overflow-hidden rounded-lg hover:shadow-lg hover:shadow-blue-500/70 transition-all duration-300 relative shadow-gray-300 shadow-lg'>
                        <input
                            className='w-full h-full outline-none px-5 py-2.5 bg-white'
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleKeyNavigation(e, 2)}
                            ref={(el) => (inputRefs[2] = el)}
                            type={show ? "text" : "password"}
                            value={password}
                            placeholder='password'
                        />
                        <span
                            className='absolute top-2.5 right-2.5 text-2.4 text-sky-300 font-semibold cursor-pointer select-none'
                            onClick={() => setShow((prev) => !prev)}
                        >
                            {show ? "hide" : "show"}
                        </span>
                    </div>

                    {error && (
                        <p
                            className={`text-red-600 text-sm mt-1 transition-opacity duration-500 ease-in-out ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                                }`}
                        >
                            ⚠️ {error}
                        </p>
                    )}

                    <button className='px-5 py-2.5 bg-linear-to-r from-sky-400 to-indigo-500
                         rounded-2xl w-[200px] mt-3 font-semibold shadow-gray-300 shadow-lg text-[20px] hover:shadow-inner' disabled={loading}>{loading ? message || "Loading..." : "Sign up"}</button>
                    <p className='cursor-pointer' onClick={() => navigate("/login")}>Already have an account ? <span className='text-sky-400 font-semibold hover:text-indigo-500'>Login</span></p>
                </form>

            </div>
        </div>

    );

}
export default SignUp
