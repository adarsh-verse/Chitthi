import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        loginState:false,
        userData:null
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData = action.payload
        },
        setLoginState:(state, action)=> {
            state.loginState = action.payload
        }
    }
})
export const {setUserData, setLoginState}=userSlice.actions
export default userSlice.reducer