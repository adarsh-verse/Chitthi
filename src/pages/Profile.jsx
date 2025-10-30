import React from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from '../redux/UserSlice';


function Profile() {
  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  let[name, setName] = useState(userData.name || "")
  let[frontendImage, setFrontendImage] = useState(userData.profile_Img || dp)
  let[backendImage, setBackendImage] = useState(null)
  let image = useRef()
  let[saving, setSaving] = useState(false)

  const handleImage = (e)=>{
    let file = e.target.files[0]
    if(!file) return;
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async (e)=>{
    setSaving(true)
    e.preventDefault()
    try{
      let formData = new FormData()
      formData.append("name", name)
      if(backendImage){
        formData.append("image", backendImage)
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData,
        {withCredentials:true})
        setSaving(false)
        dispatch(setUserData(result.data))
        navigate("/")

    } catch (err){

      console.log(err)
      setSaving(false)
    }

  }

  return (
    <div className="w-full h-screen bg-linear-to-b from-sky-200 via-pink-100 to-white flex flex-col justify-center items-center px-4">
 <div className="fixed top-5 left-5 z-50">
<div className="fixed top-5 left-5 z-50 group">
  <div
    onClick={() => navigate("/")}
    className="relative p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-md cursor-pointer overflow-hidden transition-all duration-300"
  >
    
    <span className="absolute inset-0 bg-linear-to-r from-sky-400 to-indigo-500 scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
    
  
    <IoIosArrowRoundBack className="relative z-10 w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
  </div>
</div>

</div>
      <div className="relative w-full max-w-[420px] bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 flex flex-col items-center gap-8">

        
        <div className="relative rounded-full shadow-xl hover:scale-105 transition-transform duration-300" >
          <div className="h-[180px] w-[180px] rounded-full overflow-hidden border-4 border-white/50 shadow-inner bg-white/20">
            <img src={frontendImage} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-2 right-2 bg-white/80 p-2 rounded-full shadow-md hover:bg-sky-400 hover:text-white transition-all duration-300 cursor-pointer" onClick={()=>image.current.click()}>
            <IoCameraOutline className="w-6 h-6" />
          </div>
        </div>

       
        <form className="flex flex-col justify-center items-center gap-5 w-full" onSubmit={handleProfile}>
          <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className="w-full h-[50px] px-4 py-2 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-sm text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 shadow-md"
          />
          <input
            type="text"
            readOnly
            placeholder="Username"
            value={userData?.userName}
            className="w-full h-[50px] px-4 py-2 rounded-2xl border border-white/50 bg-gray-200 text-gray-400  outline-none shadow-md"
          />
          <input
            type="email"
            readOnly
            placeholder="Email"
            value={userData?.email}
            className="w-full h-[50px] px-4 py-2 rounded-2xl border border-white/50 bg-gray-200 text-gray-400  outline-none shadow-md"
          />

          <button
            type="submit"
            className="mt-4 py-3 w-[50%] rounded-2xl font-bold text-white text-lg bg-linear-to-r from-sky-500 to-purple-500 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md" 
          disabled={saving}
          >
           
            {saving? "Saving..": "Save Profile"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Profile
