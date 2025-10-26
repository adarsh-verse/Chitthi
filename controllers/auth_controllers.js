import genToken from "../config/token.js";
import User from "../models/user_model.js"
import bcrypt from "bcryptjs";

export const signUp = async (req, res)=>{
    try{
        const {userName, email , password} = req.body
        const existingEmail = await User.findOne({email})
        const existingUserName = await User.findOne({userName})

        if(existingEmail){
            return res.status(400).json({"message": "Email already in use"})
        }
        if(existingUserName){
            return res.status(400).json({"message": "Username already exist"})
        }
        if(password.length<6){
            return res.status(400).json({message: "password must be at least 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const  user = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        
        const token =  genToken(user._id)

        res.cookie("token", token,
            {
                httpOnly:true,
                maxAge: 7*24*60*60*1000,
                sameSite:"strict",
                secure:false
            }
        )
        res.status(201).json({user});
        
    }catch (err){
        res.status(500).json({message:`signup error ${err.message}`})
    }
}


export const login = async (req, res)=>{
    try{
        const { email , password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({"message": "user does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"});
        }


        const token =  genToken(user._id)

        res.cookie("token", token,
            {
                httpOnly:true,
                maxAge: 7*24*60*60*1000,
                sameSite:"strict",
                secure:false
            }
        )

        res.status(200).json({user});
        
    }catch (err){
        res.status(500).json({message:`login error ${err.message}`})
    }
}

export const logOut = async (req, res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out sucessfully"})
    }catch (err){
        console.log(`log out error ${err.message}`)
    }
}
