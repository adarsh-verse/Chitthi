import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/UserSlice"


const useCurrentUser = ()=>{
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async ()=>{
         
            try{
                let result = await axios.get(`${serverUrl}/api/user/current`
                ,{withCredentials:true});
                dispatch(setUserData(result.data));
            } catch (err){
             if (err.response?.status === 401) {
               dispatch(setUserData(null));
            } else{
                console.error("Unexpected error fetching current user:", err.message)
            }
                
            }
        }
        fetchUser(); 
    },[])
    return userData;
};
export default useCurrentUser