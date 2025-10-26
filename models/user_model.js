import mongoose from "mongoose";

const user_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profile_Img:{
        type:String,
        default:"",
    }
},
    {timestamps:true})

const User = mongoose.model("User", user_Schema)
export default User