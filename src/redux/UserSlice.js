import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        loginState:false,
        userData:null,
        otherUserData:[]
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData = action.payload
        },
        setOtherUserData:(state, action)=>{
            state.otherUserData = action.payload
        }
    }
})
export const {setUserData, setLoginState, setOtherUserData}=userSlice.actions
export default userSlice.reducer