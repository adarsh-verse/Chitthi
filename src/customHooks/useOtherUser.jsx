import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUserData } from "../redux/UserSlice"


const useOtherUser = ()=>{
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser = async ()=>{
         
            try{
                let result = await axios.get(`${serverUrl}/api/user/getUsers`
                ,{withCredentials:true});
                
                dispatch(setOtherUserData(result.data));
            } catch (err){
                console.log("Error fetching current user:",err)
            }
        }
        fetchUser(); 
    },[userData])
    return userData;
};
export default useOtherUser 