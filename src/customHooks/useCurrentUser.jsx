import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/UserSlice"


const useCurrentUser = ()=>{
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    console.log(userData);
    useEffect(()=>{
        const fetchUser = async ()=>{
         
            try{
                let result = await axios.get(`${serverUrl}/api/user/current`
                ,{withCredentials:true});
                console.log("Fetched user:", result.data);
                dispatch(setUserData(result.data));
            } catch (err){
                console.log("Error fetching current user:",err)
            }
        }
        fetchUser(); 
    },[])
    return userData;
};
export default useCurrentUser